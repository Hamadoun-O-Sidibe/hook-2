import { useEffect, useMemo, useState } from "react";
import ContactForm from "./components/ContactForm.jsx";
import ContactList from "./components/ContactList.jsx";
import SearchBar from "./components/SearchBar.jsx";

const STORAGE_KEY = "le-carnet-contacts";

function App() {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [editingContact, setEditingContact] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [storageMessage, setStorageMessage] = useState("");

  useEffect(() => {
    try {
      const savedContacts = window.localStorage.getItem(STORAGE_KEY);
      if (savedContacts) {
        const parsedContacts = JSON.parse(savedContacts);
        if (!Array.isArray(parsedContacts)) {
          throw new Error("Le format des contacts enregistrés est invalide.");
        }
        setContacts(parsedContacts);
      }
    } catch (error) {
      console.error("Impossible de charger les contacts :", error);
      setStorageMessage(
        "Les contacts enregistrés n’ont pas pu être chargés. Vous pouvez continuer avec une liste vide.",
      );
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
    } catch (error) {
      console.error("Impossible d’enregistrer les contacts :", error);
      setStorageMessage(
        "La sauvegarde locale a échoué. Vérifiez l’espace de stockage de votre navigateur.",
      );
    }
  }, [contacts, isLoaded]);

  const visibleContacts = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase("fr");

    return contacts
      .filter((contact) =>
        contact.fullName.toLocaleLowerCase("fr").includes(normalizedSearch),
      )
      .sort((first, second) => {
        const comparison = first.fullName.localeCompare(second.fullName, "fr", {
          sensitivity: "base",
        });
        return sortOrder === "asc" ? comparison : -comparison;
      });
  }, [contacts, search, sortOrder]);

  function handleSaveContact(contactDetails) {
    if (editingContact) {
      setContacts((currentContacts) =>
        currentContacts.map((contact) =>
          contact.id === editingContact.id
            ? { ...contact, ...contactDetails }
            : contact,
        ),
      );
      setEditingContact(null);
      return;
    }

    setContacts((currentContacts) => [
      ...currentContacts,
      { ...contactDetails, id: crypto.randomUUID() },
    ]);
  }

  function handleDeleteContact(contactId) {
    setContacts((currentContacts) =>
      currentContacts.filter((contact) => contact.id !== contactId),
    );
    if (editingContact?.id === contactId) setEditingContact(null);
  }

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-5 sm:px-8">
      <header className="flex h-[76px] items-center justify-between border-b border-[#e8e7e0]">
        <a
          className="flex items-center gap-2.5 text-base font-bold tracking-tight text-[#252b25] no-underline"
          href="/"
          aria-label="Le carnet, accueil"
        >
          <span className="grid size-8 place-items-center rounded-full bg-[#46694f] font-serif text-lg text-white">c.</span>
          <span>le carnet</span>
        </a>
        <span className="text-xs text-[#85897f]">Un petit espace à vous</span>
      </header>

      <section
        className="relative flex min-h-[280px] items-center overflow-hidden border-b border-[#e8e7e0] py-10"
        aria-labelledby="page-title"
      >
        <div className="relative z-10">
          <span className="text-[10px] font-bold tracking-[1.65px] text-[#73816d]">VOTRE CARNET D’ADRESSES</span>
          <h1 id="page-title" className="my-4 font-serif text-5xl leading-[1.06] tracking-tight text-[#252b25] sm:text-6xl">
            Les personnes
            <br />
            <span className="italic text-[#46694f]">qui comptent.</span>
          </h1>
          <p className="max-w-[410px] text-sm leading-7 text-[#777d73]">
            Retrouvez vos proches et vos contacts professionnels, réunis dans un seul endroit.
          </p>
        </div>
        <div className="pointer-events-none absolute -right-8 top-8 hidden size-60 items-center justify-center sm:flex" aria-hidden="true">
          <span className="absolute size-40 rounded-full bg-[#e9e9dc]" />
          <span className="absolute h-20 w-60 rotate-[-24deg] rounded-[50%] border border-[#8e9b81]" />
          <span className="absolute h-28 w-52 rotate-[42deg] rounded-[50%] border border-[#8e9b81]" />
          <span className="absolute left-12 top-14 size-3 rounded-full border-[3px] border-[#f5f4f0] bg-[#46694f]" />
          <span className="absolute bottom-1 right-1 font-serif text-sm italic leading-5 text-[#828979]">toujours<br />à portée de main</span>
        </div>
      </section>

      {storageMessage && (
        <div className="mt-4 flex items-center justify-between gap-4 rounded-lg border border-[#ead3c4] bg-[#fbf3eb] px-4 py-3 text-xs leading-5 text-[#80563f]" role="status">
          <span>{storageMessage}</span>
          <button
            className="text-lg"
            type="button"
            aria-label="Fermer le message"
            onClick={() => setStorageMessage("")}
          >
            ×
          </button>
        </div>
      )}

      <section className="grid items-start gap-8 py-9 md:grid-cols-[minmax(0,1fr)_350px] lg:gap-12" aria-label="Gestion des contacts">
        <div>
          <div className="mb-5 flex min-h-[52px] items-center justify-between">
            <div>
              <span className="text-[10px] font-bold tracking-[1.65px] text-[#73816d]">VOTRE PETIT MONDE</span>
              <h2 className="mt-1 font-serif text-[27px] tracking-tight text-[#252b25]">
                Contacts <span className="ml-1 align-[3px] font-sans text-sm font-medium text-[#999c91]">{contacts.length}</span>
              </h2>
            </div>
            <button
              className="inline-flex items-center gap-2 rounded-md border border-[#e4e5dc] bg-[#fbfaf6] px-3 py-2 text-[11px] font-semibold text-[#5b6557] transition hover:border-[#b7c1ae] hover:bg-white"
              type="button"
              onClick={() =>
                setSortOrder((currentOrder) =>
                  currentOrder === "asc" ? "desc" : "asc",
                )
              }
              aria-label={`Trier par nom ${sortOrder === "asc" ? "de Z à A" : "de A à Z"}`}
            >
              <span className="text-base text-[#46694f]" aria-hidden="true">{sortOrder === "asc" ? "↑" : "↓"}</span>
              {sortOrder === "asc" ? "A–Z" : "Z–A"}
            </button>
          </div>

          <SearchBar search={search} onSearchChange={setSearch} />
          <ContactList
            contacts={visibleContacts}
            hasContacts={contacts.length > 0}
            search={search}
            onEdit={setEditingContact}
            onDelete={handleDeleteContact}
          />
        </div>

        <aside className="rounded-xl border border-[#e8e7df] bg-[#fffefa] p-5 shadow-sm">
          <ContactForm
            key={editingContact?.id ?? "new-contact"}
            contact={editingContact}
            onSave={handleSaveContact}
            onCancel={() => setEditingContact(null)}
          />
        </aside>
      </section>

      <footer className="flex min-h-[60px] flex-wrap items-center justify-center gap-2 border-t border-[#e8e7e0] py-4 text-center text-[10px] text-[#96988e] sm:justify-between">
        <span>Fait avec soin, rien que pour vous.</span>
        <span className="text-base text-[#84937c]" aria-hidden="true">✳</span>
        <span>Vos contacts restent sur cet appareil.</span>
      </footer>
    </main>
  );
}

export default App;
