import type { WordListGroup } from "@/lib/word-lists";

interface WordListSectionProps {
  title: string;
  intro: string;
  groups: WordListGroup[];
  totalCount: number;
}

export function WordListSection({
  title,
  intro,
  groups,
  totalCount,
}: WordListSectionProps) {
  return (
    <section className="seo-word-list" aria-labelledby="word-list-heading">
      <h2 id="word-list-heading">{title}</h2>
      <p className="seo-word-list-intro">{intro}</p>
      <p className="seo-word-list-count">
        {totalCount} words in this list — tap Start to play with zero repeats per
        game.
      </p>

      {groups.map((group) => (
        <div key={group.category} className="seo-category-block">
          <h3>
            {group.emoji} {group.label}{" "}
            <span className="seo-badge">{group.words.length}</span>
          </h3>
          <ul>
            {group.words.map((word) => (
              <li key={word}>{word}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
