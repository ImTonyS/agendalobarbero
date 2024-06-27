"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Input, SubmitButton } from "@/components/fields";
import apiClient from "@/libs/api";
import { toast } from "react-hot-toast";
import { validatePhone as validatePhoneNumber } from "@/libs/formValidators";
import config from "@/config";
import axios from "axios";
import { useRouter } from "next/navigation";
import { isValid } from "date-fns";
import { parsePhoneNumber } from "libphonenumber-js";

const NewBarberShopForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm();

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  //Functions...

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const { name, whatsappNumber, slug } = data;

      const isValidNumber = await validatePhoneNumber(whatsappNumber, "MX");

      if (!isValidNumber) {
        setError("whatsappNumber", {
          type: "manual",
          message: "El numero de whatsapp no es valido",
        });
        return;
      }

      if (/[^a-zA-Z0-9-]/.test(slug)) {
        setError("slug", {
          type: "manual",
          message:
            "El enlace para tu negocio solo puede contener letras, números y guiones",
        });
        return;
      }

      const parsedPhone = parsePhoneNumber(whatsappNumber, "MX");
      const parsedSlug = slug.toLowerCase().replace(/\s/g, "");

      const {
        data: { available: isSlugAvailable },
      } = await axios.get(`/api/barbershop/${parsedSlug}`);

      if (!isSlugAvailable) {
        setError("slug", {
          type: "manual",
          message: "El enlace para tu negocio ya está en uso",
        });
        return;
      }
      const dataToSave = {
        name,
        whatsapp: {
          number: parsedPhone.nationalNumber,
          country: parsedPhone.country,
          numberFull: parsedPhone.number,
        },
        slug,
      };
      await apiClient.post("/barbershop", dataToSave);
      toast.success("Negocio creado con éxito 🙌🏻");
      await new Promise((resolve) => setTimeout(resolve, 2000)); //wait 2 seconds
      router.push("/dashboard");
    } catch (e) {
      console.error(e?.message);
    } finally {
      setIsLoading(false);
    }

    //TODO: Return the form, now working on the input comp
  };
  return (
    <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
      {/* Barbershop name */}
      <div className="field my-6">
        <Input
          label="Nombre de tu barberia"
          name="name"
          type="text"
          placeholder="Ej: Barber Studio"
          register={{
            ...register("name", {
              //Se puede optimizar esto
              required: {
                value: true,
                message: "El nombre de tu barberia es requerido",
              },
            }),
          }}
          errorMessage={errors.name?.message}
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
      <div className="field my-6">
        <Input
          prelabel={`${config.domainName}`}
          label="Enlace para tu negocio"
          name="slug"
          type="text"
          placeholder="Ej: barberstudio"
          register={{
            ...register("slug", {
              required: {
                value: true,
                message: "El enlace para tu barberia es requerido",
              },
            }),
          }}
          errorMessage={errors.slug?.message}
        />
      </div>

      <SubmitButton isLoading={isLoading} text="Submit" className />
    </form>
  );
};

export default NewBarberShopForm;
