"use client";

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import styles from "./FormularioTrabaja.module.css";

type FormValues = {
  nombre: string;
  telefono: string;
  correo: string;
  ciudad: string;
  cargo: string;
  profesion: string;
  experiencia: string;
  licencias: string;
  disponibilidad: string;
  mensaje: string;
  botField: string;
};

const initialValues: FormValues = {
  nombre: "",
  telefono: "",
  correo: "",
  ciudad: "",
  cargo: "",
  profesion: "",
  experiencia: "",
  licencias: "",
  disponibilidad: "",
  mensaje: "",
  botField: "",
};

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const allowedFileTypes = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export default function FormularioTrabaja() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [visible, setVisible] = useState(false);
  const [formValues, setFormValues] =
    useState<FormValues>(initialValues);

  const [cvFile, setCvFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");

  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(section);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -70px 0px",
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;

    setFormValues((current) => ({
      ...current,
      [name]: value,
    }));

    if (status === "error" || status === "success") {
      setStatus("idle");
    }
  };

  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0] ?? null;

    setFileError("");
    setCvFile(null);

    if (!selectedFile) return;

    if (!allowedFileTypes.includes(selectedFile.type)) {
      setFileError(
        "El archivo debe estar en formato PDF, DOC o DOCX."
      );

      event.target.value = "";
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      setFileError(
        "El currículum no puede superar los 10 MB."
      );

      event.target.value = "";
      return;
    }

    setCvFile(selectedFile);
  };

  const removeFile = () => {
    setCvFile(null);
    setFileError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const resetForm = () => {
    setFormValues(initialValues);
    setCvFile(null);
    setFileError("");
    setStatus("idle");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (formValues.botField) return;

    if (!cvFile) {
      setFileError(
        "Debes adjuntar tu currículum para enviar la postulación."
      );
      return;
    }

    setStatus("sending");
    setFileError("");

    const payload = new FormData();

    payload.append("Nombre y apellido", formValues.nombre);
    payload.append("Teléfono", formValues.telefono);
    payload.append("Correo electrónico", formValues.correo);
    payload.append("Ciudad de residencia", formValues.ciudad);
    payload.append("Cargo de interés", formValues.cargo);
    payload.append("Profesión u oficio", formValues.profesion);
    payload.append("Experiencia laboral", formValues.experiencia);

    payload.append(
      "Licencias y certificaciones",
      formValues.licencias || "No informadas"
    );

    payload.append(
      "Disponibilidad",
      formValues.disponibilidad
    );

    payload.append(
      "Mensaje adicional",
      formValues.mensaje || "Sin mensaje adicional"
    );

    payload.append("Currículum", cvFile);

    payload.append(
      "_subject",
      `Nueva postulación laboral: ${formValues.nombre}`
    );

    payload.append("_template", "table");
    payload.append("_captcha", "false");

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/contacto@transportesiquique.cl",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: payload,
        }
      );

      const result = await response.json();

      if (
        !response.ok ||
        result.success === false ||
        result.success === "false"
      ) {
        throw new Error("No fue posible enviar la postulación.");
      }

      setStatus("success");
      setFormValues(initialValues);
      setCvFile(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error al enviar la postulación:", error);
      setStatus("error");
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${
        visible ? styles.visible : ""
      }`}
      aria-labelledby="formulario-trabaja-title"
    >
      <div className={styles.inner}>
        <div className={styles.introduction}>
          <span className={styles.eyebrow}>
            Postulación laboral
          </span>

          <h2
            id="formulario-trabaja-title"
            className={styles.title}
          >
            Envíanos tus antecedentes
          </h2>

          <p className={styles.description}>
            Completa tus datos y adjunta tu currículum para
            considerarte en futuros procesos de selección de
            Transportes Iquique.
          </p>

          <div className={styles.process}>
            <div>
              <span>01</span>
              <p>Completa tus antecedentes personales y laborales.</p>
            </div>

            <div>
              <span>02</span>
              <p>Adjunta tu currículum actualizado.</p>
            </div>

            <div>
              <span>03</span>
              <p>Revisaremos tu perfil cuando exista una vacante.</p>
            </div>
          </div>

          <div className={styles.fileInformation}>
            <span>Documentos admitidos</span>
            <p>PDF, DOC o DOCX · Peso máximo: 10 MB.</p>
          </div>
        </div>

        <div className={styles.formWrapper}>
          {status === "success" ? (
            <div
              className={styles.successMessage}
              role="status"
              aria-live="polite"
            >
              <span className={styles.successLabel}>
                Postulación enviada
              </span>

              <h3>Recibimos tus antecedentes</h3>

              <p>
                Tu información y currículum fueron enviados
                correctamente. Revisaremos tu perfil cuando exista
                un proceso de selección relacionado con tu
                experiencia.
              </p>

              <button
                type="button"
                className={styles.newRequestButton}
                onClick={resetForm}
              >
                Enviar otra postulación
              </button>
            </div>
          ) : (
            <form
              className={styles.form}
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              <input
                type="text"
                name="botField"
                value={formValues.botField}
                onChange={handleChange}
                className={styles.honeypot}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <div className={styles.formGrid}>
                <div className={styles.field}>
                  <label htmlFor="nombre">
                    Nombre y apellido
                    <span aria-hidden="true">*</span>
                  </label>

                  <input
                    id="nombre"
                    name="nombre"
                    type="text"
                    value={formValues.nombre}
                    onChange={handleChange}
                    placeholder="Ingresa tu nombre completo"
                    autoComplete="name"
                    required
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="telefono">
                    Teléfono
                    <span aria-hidden="true">*</span>
                  </label>

                  <input
                    id="telefono"
                    name="telefono"
                    type="tel"
                    value={formValues.telefono}
                    onChange={handleChange}
                    placeholder="+56 9 0000 0000"
                    autoComplete="tel"
                    required
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="correo">
                    Correo electrónico
                    <span aria-hidden="true">*</span>
                  </label>

                  <input
                    id="correo"
                    name="correo"
                    type="email"
                    value={formValues.correo}
                    onChange={handleChange}
                    placeholder="nombre@correo.cl"
                    autoComplete="email"
                    required
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="ciudad">
                    Ciudad de residencia
                    <span aria-hidden="true">*</span>
                  </label>

                  <input
                    id="ciudad"
                    name="ciudad"
                    type="text"
                    value={formValues.ciudad}
                    onChange={handleChange}
                    placeholder="Ej.: Iquique"
                    autoComplete="address-level2"
                    required
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="cargo">
                    Cargo de interés
                    <span aria-hidden="true">*</span>
                  </label>

                  <div className={styles.selectWrapper}>
                    <select
                      id="cargo"
                      name="cargo"
                      value={formValues.cargo}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>
                        Selecciona un área o cargo
                      </option>

                      <option value="Conductor profesional">
                        Conductor profesional
                      </option>

                      <option value="Operador de equipos">
                        Operador de equipos
                      </option>

                      <option value="Mecánica y mantenimiento">
                        Mecánica y mantenimiento
                      </option>

                      <option value="Operaciones y logística">
                        Operaciones y logística
                      </option>

                      <option value="Prevención de riesgos">
                        Prevención de riesgos
                      </option>

                      <option value="Administración">
                        Administración
                      </option>

                      <option value="Otro cargo">
                        Otro cargo
                      </option>
                    </select>
                  </div>
                </div>

                <div className={styles.field}>
                  <label htmlFor="profesion">
                    Profesión u oficio
                    <span aria-hidden="true">*</span>
                  </label>

                  <input
                    id="profesion"
                    name="profesion"
                    type="text"
                    value={formValues.profesion}
                    onChange={handleChange}
                    placeholder="Indica tu especialidad"
                    required
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="experiencia">
                    Experiencia laboral
                    <span aria-hidden="true">*</span>
                  </label>

                  <div className={styles.selectWrapper}>
                    <select
                      id="experiencia"
                      name="experiencia"
                      value={formValues.experiencia}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>
                        Selecciona tu experiencia
                      </option>

                      <option value="Sin experiencia">
                        Sin experiencia
                      </option>

                      <option value="Menos de 1 año">
                        Menos de 1 año
                      </option>

                      <option value="Entre 1 y 3 años">
                        Entre 1 y 3 años
                      </option>

                      <option value="Entre 3 y 5 años">
                        Entre 3 y 5 años
                      </option>

                      <option value="Más de 5 años">
                        Más de 5 años
                      </option>
                    </select>
                  </div>
                </div>

                <div className={styles.field}>
                  <label htmlFor="disponibilidad">
                    Disponibilidad
                    <span aria-hidden="true">*</span>
                  </label>

                  <div className={styles.selectWrapper}>
                    <select
                      id="disponibilidad"
                      name="disponibilidad"
                      value={formValues.disponibilidad}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>
                        Selecciona una opción
                      </option>

                      <option value="Inmediata">
                        Inmediata
                      </option>

                      <option value="Dentro de 15 días">
                        Dentro de 15 días
                      </option>

                      <option value="Dentro de 30 días">
                        Dentro de 30 días
                      </option>

                      <option value="A convenir">
                        A convenir
                      </option>
                    </select>
                  </div>
                </div>

                <div
                  className={`${styles.field} ${styles.fullField}`}
                >
                  <label htmlFor="licencias">
                    Licencias, cursos o certificaciones
                  </label>

                  <input
                    id="licencias"
                    name="licencias"
                    type="text"
                    value={formValues.licencias}
                    onChange={handleChange}
                    placeholder="Ej.: Licencia A5, D, curso de conducción en faena, acreditaciones"
                  />
                </div>

                <div
                  className={`${styles.field} ${styles.fullField}`}
                >
                  <label htmlFor="mensaje">
                    Presentación o información adicional
                  </label>

                  <textarea
                    id="mensaje"
                    name="mensaje"
                    value={formValues.mensaje}
                    onChange={handleChange}
                    placeholder="Cuéntanos brevemente sobre tu experiencia, conocimientos y disponibilidad."
                    rows={5}
                  />
                </div>

                <div
                  className={`${styles.field} ${styles.fullField}`}
                >
                  <label htmlFor="curriculum">
                    Currículum
                    <span aria-hidden="true">*</span>
                  </label>

                  <div
                    className={`${styles.fileField} ${
                      cvFile ? styles.fileSelected : ""
                    }`}
                  >
                    <input
                      ref={fileInputRef}
                      id="curriculum"
                      name="curriculum"
                      type="file"
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      onChange={handleFileChange}
                      required
                    />

                    <label
                      htmlFor="curriculum"
                      className={styles.fileButton}
                    >
                      <span className={styles.fileAction}>
                        Seleccionar archivo
                      </span>

                      <span className={styles.fileName}>
                        {cvFile
                          ? cvFile.name
                          : "Ningún documento seleccionado"}
                      </span>

                      <span
                        className={styles.fileLine}
                        aria-hidden="true"
                      />
                    </label>

                    {cvFile && (
                      <button
                        type="button"
                        className={styles.removeFileButton}
                        onClick={removeFile}
                      >
                        Quitar
                      </button>
                    )}
                  </div>

                  <p className={styles.fileHelp}>
                    Adjunta un documento PDF, DOC o DOCX de hasta
                    10 MB.
                  </p>

                  {fileError && (
                    <p className={styles.fileError} role="alert">
                      {fileError}
                    </p>
                  )}
                </div>
              </div>

              <div className={styles.formFooter}>
                <p>
                  Los campos marcados con
                  <span aria-hidden="true"> *</span> son obligatorios.
                </p>

                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={status === "sending"}
                >
                  <span>
                    {status === "sending"
                      ? "Enviando postulación..."
                      : "Enviar postulación"}
                  </span>

                  <span
                    className={styles.buttonLine}
                    aria-hidden="true"
                  />
                </button>
              </div>

              {status === "error" && (
                <div
                  className={styles.errorMessage}
                  role="alert"
                  aria-live="assertive"
                >
                  No fue posible enviar la postulación. Revisa tu
                  conexión, el formato del archivo e inténtalo
                  nuevamente.
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}