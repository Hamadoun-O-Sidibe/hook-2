function SearchBar({ search, onSearchChange }) {
  return (
    <label className="flex h-11 items-center gap-2.5 rounded-lg border border-[#e5e5dd] bg-[#fbfaf7] px-3 transition focus-within:border-[#9baa91] focus-within:ring-4 focus-within:ring-[#46694f]/[0.08]">
      <span className="text-[22px] leading-none text-[#7d8977]" aria-hidden="true">⌕</span>
      <input
        className="w-full border-0 bg-transparent text-xs text-[#252b25] outline-none placeholder:text-[#a0a197]"
        type="search"
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Rechercher un nom..."
        aria-label="Rechercher un contact par nom"
      />
      {search && (
        <button
          className="px-0.5 text-xl text-[#83887e]"
          type="button"
          onClick={() => onSearchChange("")}
          aria-label="Effacer la recherche"
        >
          ×
        </button>
      )}
    </label>
  );
}

export default SearchBar;
