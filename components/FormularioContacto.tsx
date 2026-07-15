"use client";

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import styles from "./FormularioContacto.module.css";

type FormDataState = {
  nombre: string;
  empresa: string;
  telefono: string;
  correo: string;
  servicio: string;
  origenDestino: string;
  mensaje: string;
  botField: string;
};

const initialFormData: FormDataState = {
  nombre: "",
  empresa: "",
  telefono: "",
  correo: "",
  servicio: "",
  origenDestino: "",
  mensaje: "",
  botField: "",
};

export default function FormularioContacto() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const [visible, setVisible] = useState(false);
  const [formData, setFormData] =
    useState<FormDataState>(initialFormData);

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
        threshold: 0.12,
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

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    if (status === "success" || status === "error") {
      setStatus("idle");
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formData.botField) return;

    setStatus("sending");

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/contacto@transportesiquique.cl",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            Nombre: formData.nombre,
            Empresa: formData.empresa || "No informada",
            Teléfono: formData.telefono,
            Correo: formData.correo,
            "Servicio de interés": formData.servicio,
            "Origen y destino": formData.origenDestino,
            "Detalle del requerimiento": formData.mensaje,

            _subject:
              "Nueva solicitud de transporte desde transportesiquique.cl",

            _template: "table",

            _captcha: "false",
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || result.success === "false") {
        throw new Error("No fue posible enviar el formulario.");
      }

      setStatus("success");
      setFormData(initialFormData);
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setStatus("error");
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${
        visible ? styles.visible : ""
      }`}
      aria-labelledby="formulario-contacto-title"
    >
      <div className={styles.inner}>
        <div className={styles.introduction}>
          <span className={styles.eyebrow}>
            Solicitud de servicio
          </span>

          <h2
            id="formulario-contacto-title"
            className={styles.title}
          >
            Cuéntanos qué necesitas transportar
          </h2>

          <p className={styles.description}>
            Completa los antecedentes de tu requerimiento. Nuestro
            equipo revisará la información para coordinar una
            alternativa de transporte adecuada a la operación.
          </p>

          <div className={styles.process}>
            <div>
              <span>01</span>
              <p>Completa los datos de contacto y operación.</p>
            </div>

            <div>
              <span>02</span>
              <p>Revisaremos las características del traslado.</p>
            </div>

            <div>
              <span>03</span>
              <p>Nos comunicaremos para coordinar el servicio.</p>
            </div>
          </div>
        </div>

        <div className={styles.formWrapper}>
          {status === "success" ? (
            <div
              className={styles.successMessage}
              role="status"
              aria-live="polite"
            >
              <span className={styles.successNumber}>Solicitud enviada</span>

              <h3>Recibimos tu requerimiento</h3>

              <p>
                La información fue enviada correctamente. Nuestro
                equipo revisará los antecedentes y se comunicará
                contigo a la brevedad.
              </p>

              <button
                type="button"
                className={styles.newRequestButton}
                onClick={() => setStatus("idle")}
              >
                Enviar otra solicitud
              </button>
            </div>
          ) : (
            <form
              className={styles.form}
              onSubmit={handleSubmit}
              noValidate={false}
            >
              <input
                type="text"
                name="botField"
                value={formData.botField}
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
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Ingresa tu nombre"
                    autoComplete="name"
                    required
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="empresa">Empresa</label>

                  <input
                    id="empresa"
                    name="empresa"
                    type="text"
                    value={formData.empresa}
                    onChange={handleChange}
                    placeholder="Nombre de la empresa"
                    autoComplete="organization"
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
                    value={formData.telefono}
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
                    value={formData.correo}
                    onChange={handleChange}
                    placeholder="nombre@empresa.cl"
                    autoComplete="email"
                    required
                  />
                </div>

                <div className={`${styles.field} ${styles.fullField}`}>
                  <label htmlFor="servicio">
                    Servicio de interés
                    <span aria-hidden="true">*</span>
                  </label>

                  <div className={styles.selectWrapper}>
                    <select
                      id="servicio"
                      name="servicio"
                      value={formData.servicio}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>
                        Selecciona un servicio
                      </option>

                      <option value="Transporte de carga por carretera">
                        Transporte de carga por carretera
                      </option>

                      <option value="Maquinaria de alto tonelaje">
                        Maquinaria de alto tonelaje
                      </option>

                      <option value="Cargas sobredimensionadas">
                        Cargas sobredimensionadas
                      </option>

                      <option value="Materiales e insumos para minería">
                        Materiales e insumos para minería
                      </option>

                      <option value="Arriendo de equipos">
                        Arriendo de equipos
                      </option>

                      <option value="Retiro de residuos no compactables">
                        Retiro de residuos no compactables
                      </option>

                      <option value="Otro requerimiento">
                        Otro requerimiento
                      </option>
                    </select>
                  </div>
                </div>

                <div className={`${styles.field} ${styles.fullField}`}>
                  <label htmlFor="origenDestino">
                    Origen y destino de la carga
                    <span aria-hidden="true">*</span>
                  </label>

                  <input
                    id="origenDestino"
                    name="origenDestino"
                    type="text"
                    value={formData.origenDestino}
                    onChange={handleChange}
                    placeholder="Ej.: Iquique – Calama"
                    required
                  />
                </div>

                <div className={`${styles.field} ${styles.fullField}`}>
                  <label htmlFor="mensaje">
                    Mensaje o detalle del requerimiento
                    <span aria-hidden="true">*</span>
                  </label>

                  <textarea
                    id="mensaje"
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    placeholder="Indica tipo de carga, dimensiones, peso, fecha estimada y cualquier antecedente relevante."
                    rows={6}
                    required
                  />
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
                      ? "Enviando solicitud..."
                      : "Enviar solicitud"}
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
                  No fue posible enviar la solicitud. Revisa tu
                  conexión e inténtalo nuevamente.
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}