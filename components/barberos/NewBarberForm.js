"use client";
import { useForm, useFieldArray } from "react-hook-form";
import { useState } from "react";
import { Input, SubmitButton, Divider, CheckBox } from "@/components/fields";
import apiClient from "@/libs/api";
import { toast } from "react-hot-toast";
import { validatePhone as validatePhoneNumber } from "@/libs/formValidators";
import config from "@/config";
import axios from "axios";
import { useRouter } from "next/navigation";
import { isValid } from "date-fns";
import { parsePhoneNumber } from "libphonenumber-js";
import operationDays from "@/data/operationdays";
import daysParser from "@/data/daysParser";
import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/24/outline";

const NewBarberForm = () => {
  const {
    watch,
    control,
    getValues,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm();

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  //RHF WATCHES.......................................................
  const daysWatch = watch("days");

  //Fields
  const { fields, append, insert, remove } = useFieldArray({
    name: "hours",
    control,
  });

  //Functions...

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const { name, lastname, whatsappNumber, hours, days } = data;
      console.log(hours);

      const isValidNumber = await validatePhoneNumber(whatsappNumber, "MX");

      if (!isValidNumber) {
        setError("whatsappNumber", {
          type: "manual",
          message: "El numero de whatsapp no es valido",
        });
        return;
      }

      if (!hours || hours.length === 0) {
        toast.error("Debes agregar al menos un horario");
        return; //this line, stops the function from executing
      }

      const adjustedHours = data.hours.map((hour) => {
        // Map through each interval in the hour to adjust times
        const adjustedIntervals = hour.intervals.map((interval) => {
          const startTime = new Date(`1970-01-01T${interval.start}`);
          startTime.setMinutes(Math.round(startTime.getMinutes() / 30) * 30);
          const endTime = new Date(`1970-01-01T${interval.end}`);
          endTime.setMinutes(Math.round(endTime.getMinutes() / 30) * 30);

          return {
            ...interval,
            start: startTime.toTimeString().slice(0, 5), // Format HH:MM
            end: endTime.toTimeString().slice(0, 5), // Format HH:MM
          };
        });

        return {
          ...hour,
          intervals: adjustedIntervals,
        };
      });

      console.log(adjustedHours);

      const parsedPhone = parsePhoneNumber(whatsappNumber, "MX");

      const dataToSave = {
        name,
        lastname,
        whatsapp: {
          number: parsedPhone.nationalNumber,
          country: parsedPhone.country,
          numberFull: parsedPhone.number,
        },
        hours: adjustedHours,
        days,
      };

      console.log(dataToSave);
      await apiClient.post("/barber", dataToSave);
      toast.success("Barber creado con éxito");
      await new Promise((resolve) => setTimeout(resolve, 2000)); //wait 2 seconds
      router.push("/dashboard");
    } catch (e) {
      console.error(e?.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
      {/* Barbershop name */}
      <div className="field my-6">
        <Input
          label="Nombre de tu barbero"
          name="name"
          type="text"
          placeholder="Ej: Cesar"
          register={{
            ...register("name", {
              //Se puede optimizar esto
              required: {
                value: true,
                message: "El nombre de tu barbero es requerido",
              },
            }),
          }}
          errorMessage={errors.name?.message}
        />
      </div>

      <div className="field my-6">
        <Input
          label="Apellido de tu barbero"
          name="lastname"
          type="text"
          placeholder="Ej: Ramos"
          register={{
            ...register("lastname", {
              //Se puede optimizar esto
              required: {
                value: true,
                message: "El apellido de tu barbero es requerido",
              },
            }),
          }}
          errorMessage={errors.lastname?.message}
        />
      </div>

      <div className="field my-6">
        <Input
          label="Numero de whatsapp"
          name="whatsapp"
          type="tel"
          placeholder="Ej: 614-233-4322"
          register={{
            ...register("whatsappNumber", {
              required: {
                value: true,
                message: "El numero de whatsapp es requerido",
              },
            }),
          }}
          errorMessage={errors.whatsappNumber?.message}
        />
      </div>

      <div className="max-w-3xl mx-auto wrapper my-4">
        <Divider label="Horarios del barbero"></Divider>

        <div className="my-4 field">
          <div className="daysofoperationcontainer">
            {operationDays.map((day, index) => (
              <div className="checkboxitem" key={index}>
                <CheckBox
                  label={day.nameEs}
                  name={`days.${day.name}`}
                  id={`days.${day.name}`}
                  key={index}
                  register={{
                    ...register(`days.${day.name}`, {
                      validate: (value) => {
                        //check if at least one day is selected
                        const selectedDays = Object.values(getValues("days"));

                        if (!selectedDays.includes(true)) {
                          setError(`days`, {
                            type: "manual",
                            message: "Debes seleccionar al menos un día",
                          });
                        } else {
                          clearErrors(`days`);
                        }
                      },
                    }),
                  }}
                  onClick={(e) => {
                    if (!e.target.checked) {
                      //remove all hours with day as day.name
                      const hours = getValues("hours");
                      const newHours = hours.filter(
                        (hour) => hour.day !== day.name
                      );
                      setValue("hours", newHours);
                    }
                  }}
                />
              </div>
            ))}
          </div>

          <div className="errorcontainer">
            {errors.days && (
              <p className="error mt-2 text-sm text-red-600">
                {errors.days.message}
              </p>
            )}
          </div>
        </div>

        {/* //HOURS OF OPERATION TITLE*/}
        {daysWatch && Object.values(daysWatch).includes(true) && (
          <>
            <div className="wrapper my-4">
              <Divider label="Horarios de Operación" hideLine={true} />
            </div>
            {/* THIS SHOWS THE TITLE FOR EVERYDAY HOUR + ADD BUTTON */}
            <div className="hoursofoperation">
              {Object.keys(daysWatch).map((dayName) => {
                const value = daysWatch[dayName];

                if (!value) return null;

                return (
                  <div
                    className="wrapper flex flex-col items-start font-semibold my-4"
                    key={dayName}
                  >
                    <div className="title flex items-center justify-start text-sm">
                      <p>
                        Especifica los horarios para{" "}
                        <span className="capitalize font-bold">
                          {daysParser(dayName).nameEs}
                        </span>
                      </p>
                      <div
                        className="button flex text-xs items-center text-buttontxt bg-buttonbg px-2 py-1 rounded-md mx-4 cursor-pointer"
                        onClick={() => {
                          append({
                            day: dayName,
                            start: "",
                            end: "",
                          });
                        }}
                      >
                        <span className="px-0 hidden md:inline-block">
                          Agregar &nbsp;
                        </span>
                        <span className="w-6 h-6 cursor-pointer ">
                          <PlusCircleIcon color="green" />
                        </span>{" "}
                      </div>
                    </div>
                    <div className="content font-normal">
                      {fields.map((field, index) => {
                        if (field.day !== dayName) {
                          return null;
                        }

                        return (
                          <div
                            key={field.id}
                            className="flex items-center justify-center space-x-4 my-2"
                          >
                            <div className="starthour">
                              {/* //hidden input for name */}
                              <input
                                type="hidden"
                                name={`hours.${index}.day`}
                                value={field.day}
                                {...register(`hours.${index}.day`)}
                              />
                              <Input
                                label="Hora Inicial"
                                name={`hours.${index}.start`}
                                type="time"
                                register={{
                                  ...register(`hours.${index}.start`, {
                                    required: {
                                      value: true,
                                      message: "Es requerido",
                                    },
                                  }),
                                }}
                                errorMessage={
                                  errors.hours?.[index]?.start?.message
                                }
                              />
                            </div>
                            <div className="endhour">
                              <Input
                                label="Hora Final"
                                name={`hours.${index}.end`}
                                type="time"
                                register={{
                                  ...register(`hours.${index}.end`, {
                                    required: {
                                      value: true,
                                      message: "Es requerido",
                                    },
                                    //validate start and end time
                                    //it should be greater than start time and less than 24:00, it can't be the same
                                    validate: {
                                      greaterThanStart: (value) => {
                                        const start = getValues(
                                          `hours.${index}.start`
                                        );

                                        const end = getValues(
                                          `hours.${index}.end`
                                        );

                                        if (start && end && start >= end) {
                                          return "Horario Inválido";
                                        }
                                        return true;
                                      },
                                    },
                                  }),
                                }}
                                errorMessage={
                                  errors.hours?.[index]?.end?.message
                                }
                              />
                            </div>
                            <span
                              className="w-6 h-6 ml-4 py-2 cursor-pointer"
                              onClick={() => {
                                remove(index);
                              }}
                            >
                              <MinusCircleIcon color="#ff0000" />
                            </span>{" "}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      <SubmitButton isLoading={isLoading} text="Submit" className />
    </form>
  );
};

export default NewBarberForm;
