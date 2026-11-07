import ContactCard from "./ContactCard.jsx";

function ContactList({ contacts, hasContacts, search, onEdit, onDelete }) {
  if (contacts.length === 0) {
    return (
      <div className="flex min-h-[275px] flex-col items-center justify-center px-6 text-center">
        <span className="grid size-[52px] place-items-center rounded-full bg-[#e9eee4] font-serif text-2xl text-[#638064]" aria-hidden="true">
          {hasContacts ? "⌕" : "♡"}
        </span>
        <h3 className="mt-4 font-serif text-lg text-[#252b25]">
          {hasContacts ? "Aucun résultat" : "Le début d’une belle liste"}
        </h3>
        <p className="mt-1 max-w-[270px] text-[11px] leading-relaxed text-[#8c9086]">
          {hasContacts
            ? `Aucun contact ne correspond à « ${search} ».`
            : "Ajoutez votre premier contact pour le retrouver ici."}
        </p>
      </div>
    );
  }

  return (
    <div className="mt-4 grid gap-2.5">
      {contacts.map((contact) => (
        <ContactCard
          key={contact.id}
          contact={contact}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default ContactList;
