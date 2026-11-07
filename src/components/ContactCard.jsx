function getInitials(fullName) {
  return fullName
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toLocaleUpperCase("fr"))
    .join("");
}

function ContactCard({ contact, onEdit, onDelete }) {
  return (
    <article className="group flex min-h-[98px] items-center gap-3.5 rounded-lg border border-[#eae9e1] bg-[#fffefa] p-3.5 shadow-sm transition hover:-translate-y-px hover:border-[#d8ddcf] hover:shadow-md">
      <div className="relative grid size-[52px] shrink-0 place-items-center overflow-hidden rounded-full bg-[#e9eee4] font-serif text-[17px] text-[#49624b]" aria-hidden="true">
        <span>{getInitials(contact.fullName)}</span>
        {contact.image && (
          <img
            alt=""
            className="absolute inset-0 size-full object-cover"
            onError={(event) => {
              event.currentTarget.hidden = true;
            }}
            src={contact.image}
          />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="mb-1.5 truncate text-[13px] font-semibold text-[#30362f]">{contact.fullName}</h3>
        <a className="mt-1 flex min-w-0 items-center gap-1.5 truncate text-[10px] text-[#858a80] no-underline hover:text-[#46694f]" href={`mailto:${contact.email}`}>
          <span className="text-xs text-[#8c9884]" aria-hidden="true">✉</span>
          <span className="truncate">{contact.email}</span>
        </a>
        {contact.phoneNumber ? (
          <a className="mt-1 flex min-w-0 items-center gap-1.5 truncate text-[10px] text-[#858a80] no-underline hover:text-[#46694f]" href={`tel:${contact.phoneNumber}`}>
            <span className="text-xs text-[#8c9884]" aria-hidden="true">⌕</span>
            <span className="truncate">{contact.phoneNumber}</span>
          </a>
        ) : (
          <span className="mt-1 flex min-w-0 items-center gap-1.5 truncate text-[10px] text-[#a3a69e]">
            <span className="text-xs text-[#8c9884]" aria-hidden="true">⌕</span>
            Aucun numéro renseigné
          </span>
        )}
      </div>
      <div className="flex flex-col opacity-70 transition group-hover:opacity-100 focus-within:opacity-100">
        <button className="grid size-7 place-items-center rounded-md text-[#74806e] hover:bg-[#f0f2eb]" type="button" onClick={() => onEdit(contact)} aria-label={`Modifier ${contact.fullName}`} title="Modifier">
          <span aria-hidden="true">✎</span>
        </button>
        <button className="grid size-7 place-items-center rounded-md text-xl text-[#b27868] hover:bg-[#faf0ec]" type="button" onClick={() => onDelete(contact.id)} aria-label={`Supprimer ${contact.fullName}`} title="Supprimer">
          <span aria-hidden="true">×</span>
        </button>
      </div>
    </article>
  );
}

export default ContactCard;
