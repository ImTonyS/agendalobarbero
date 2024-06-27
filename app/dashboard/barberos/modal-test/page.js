"use client";
import Modal from "@/components/Modal";
import { Button } from "@headlessui/react";
import { useState } from "react";
import Divider from "@/components/fields/Divider";
import CheckBox from "@/components/fields/CheckBox";
import operationDays from "@/data/operationdays";
import { useForm, useFieldArray } from "react-hook-form";
import { Main } from "next/document";
import Select from "@/components/fields/Select";
import SubmitButton2 from "@/components/fields/SubmitButton2";
import toast from "react-hot-toast";
import daysParser from "@/data/daysParser";
import { Input } from "@/components/fields";

import getTimezonesList from "@/data/getTimezonesList";

export default function ModalTest() {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    getValues,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  const { fields, append, insert, remove } = useFieldArray({
    name: "hours",
    control,
  });

  const handleOpenModal = () => {
    setOpen(true);
  };

  const countryWatch = watch("phoneCountry");
  const phoneWatch = watch("phone");
  const daysWatch = watch("days");
  const timezoneWatch = watch("timezone");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    const { hours } = data;

    try {
      ///validates phone

      if (!hours || hours.length === 0) {
        toast.error("Debes agregar al menos un horario");
        return; //this line, stops the function from executing
      }
    } catch (error) {
      toast.error("Error al validar horarios o teléfono");
      return; //this line, stops the function from executing
    }

    try {
      setIsLoading(true); //starts loading
      //parse phone number
      const dataToSave = {
        hours,
      };

      if (!lineData) {
        //new line
        await axios.post(`/api/admin/areas/${areaId}/lines/`, dataToSave);
        toast.success("Línea Creada, reedireccionando...");
        setTimeout(() => {
          window.location.href = `/admin/areas/${areaId}/lines`;
        }, 2000);
        setIsLoading(false);
      } else {
        //Edit line
        await axios.put(
          `/api/admin/areas/${areaId}/lines/${lineData?._id}`,
          dataToSave
        );
        toast.success("Línea Actualizada, reedireccionando...");
        setTimeout(() => {
          window.location.href = `/admin/areas/${areaId}/lines`;
        }, 2000);
        setIsLoading(false);
      }
    } catch (error) {
      //check if error has a message, if not, show a generic error
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        console.error("error saving line", error);
        toast.error("Ocurrió un error al guardar la línea");
      }
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Button onClick={handleOpenModal}>Open</Button>
      <Modal title={"Hola"} isModalOpen={open} setIsModalOpen={setOpen}>
        HI IM A MODAL
      </Modal>
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
                        <span className="w-6 h-6 cursor-pointer ">hola</span>{" "}
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
                              Eliminar
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
      <div className="mt-8">
        <SubmitButton2 isLoading={isLoading} label="submit" />
      </div>
    </form>
  );
}
