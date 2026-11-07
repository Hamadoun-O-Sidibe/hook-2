import { useState } from "react";

const EMPTY_FIELDS = {
  fullName: "",
  email: "",
  phoneNumber: "",
  image: "",
};

function ContactForm({ contact, onSave, onCancel }) {
  const [fields, setFields] = useState(() => ({
    ...EMPTY_FIELDS,
    ...(contact ?? {}),
  }));
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setFields((currentFields) => ({ ...currentFields, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const fullName = fields.fullName.trim();
    const email = fields.email.trim();

    if (!fullName || !email) {
      setError("Le nom complet et l’adresse e-mail sont obligatoires.");
      return;
    }

    onSave({
      fullName,
      email,
      phoneNumber: fields.phoneNumber.trim(),
      image: fields.image.trim(),
    });
    setError("");
    if (!contact) setFields(EMPTY_FIELDS);
  }

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <div className="flex items-center gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-[#e0e6dc] bg-[#f2f5ef] text-xl text-[#46694f]" aria-hidden="true">
          {contact ? "✎" : "+"}
        </span>
        <div>
          <span className="text-[8px] font-bold tracking-[1.2px] text-[#73816d]">{contact ? "UN PETIT CHANGEMENT" : "UNE NOUVELLE RENCONTRE"}</span>
          <h2 className="mt-1 font-serif text-xl text-[#252b25]">{contact ? "Modifier le contact" : "Ajouter quelqu’un"}</h2>
        </div>
      </div>
      <p className="my-3 text-[11px] leading-relaxed text-[#878b82]">
        {contact
          ? "Mettez à jour ses informations."
          : "Gardez les informations importantes à portée de main."}
      </p>

      <label className="mb-3.5 grid gap-1.5 text-[10px] font-semibold text-[#51594f]">
        <span>Nom complet <span className="text-[#bd765d]">*</span></span>
        <input
          autoComplete="name"
          className="h-10 w-full rounded-md border border-[#e7e7df] bg-[#fffefa] px-3 text-[11px] font-normal text-[#30362f] outline-none transition placeholder:text-[#b0b1a9] focus:border-[#9baa91] focus:ring-4 focus:ring-[#46694f]/[0.08]"
          name="fullName"
          onChange={handleChange}
          placeholder="Ex. Camille Martin"
          required
          value={fields.fullName}
        />
      </label>

      <label className="mb-3.5 grid gap-1.5 text-[10px] font-semibold text-[#51594f]">
        <span>Adresse e-mail <span className="text-[#bd765d]">*</span></span>
        <input
          autoComplete="email"
          className="h-10 w-full rounded-md border border-[#e7e7df] bg-[#fffefa] px-3 text-[11px] font-normal text-[#30362f] outline-none transition placeholder:text-[#b0b1a9] focus:border-[#9baa91] focus:ring-4 focus:ring-[#46694f]/[0.08]"
          name="email"
          onChange={handleChange}
          placeholder="camille@exemple.fr"
          required
          type="email"
          value={fields.email}
        />
      </label>

      <label className="mb-3.5 grid gap-1.5 text-[10px] font-semibold text-[#51594f]">
        <span>Téléphone</span>
        <input
          autoComplete="tel"
          className="h-10 w-full rounded-md border border-[#e7e7df] bg-[#fffefa] px-3 text-[11px] font-normal text-[#30362f] outline-none transition placeholder:text-[#b0b1a9] focus:border-[#9baa91] focus:ring-4 focus:ring-[#46694f]/[0.08]"
          name="phoneNumber"
          onChange={handleChange}
          placeholder="+225 0749670336"
          type="tel"
          value={fields.phoneNumber}
        />
      </label>

      <label className="mb-3.5 grid gap-1.5 text-[10px] font-semibold text-[#51594f]">
        <span>Photo <span className="ml-1 font-normal text-[#a0a398]">URL de l’image</span></span>
        <input
          className="h-10 w-full rounded-md border border-[#e7e7df] bg-[#fffefa] px-3 text-[11px] font-normal text-[#30362f] outline-none transition placeholder:text-[#b0b1a9] focus:border-[#9baa91] focus:ring-4 focus:ring-[#46694f]/[0.08]"
          name="image"
          onChange={handleChange}
          placeholder="https://exemple.fr/photo.jpg"
          type="url"
          value={fields.image}
        />
      </label>

      {error && <p className="mb-3 text-[10px] leading-relaxed text-[#a84c39]" role="alert">{error}</p>}

      <button className="flex min-h-[42px] items-center justify-between rounded-md bg-[#46694f] px-3.5 text-[11px] font-semibold text-white transition hover:-translate-y-px hover:bg-[#35523d]" type="submit">
        {contact ? "Enregistrer les changements" : "Ajouter au carnet"}
        <span className="text-base" aria-hidden="true">↗</span>
      </button>
      {contact && (
        <button className="mt-2 p-2 text-[10px] text-[#73796e] hover:text-[#35523d]" onClick={onCancel} type="button">
          Annuler la modification
        </button>
      )}
      <p className="mt-3 text-[9px] text-[#a0a298]"><span className="text-[#bd765d]">*</span> Les champs marqués sont obligatoires</p>
    </form>
  );
}

export default ContactForm;
