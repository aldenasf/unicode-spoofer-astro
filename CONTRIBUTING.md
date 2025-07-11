# 🤝 Contributing Guide

Thanks for your interest in improving Unicode Spoofer! Contributions are very welcome—especially to expand the spoofable character database.

---

## 🧩 Add Unicode Homoglyphs

The character mappings live in [`src/scripts/letters.ts`](./src/scripts/letters.ts) and follow this structure:

```ts
interface CharacterMapping {
    base: string; // The original character (e.g., "A")
    alt: string; // The Unicode homoglyph (e.g., "А" from Cyrillic)
    block: string; // The Unicode block (e.g., "Cyrillic")
}
```

To add new homoglyphs:

- Find Unicode characters that look like Latin letters, numbers, or symbols
- Add them to the correct category (`uppercase`, `lowercase`, `numbers`, `symbols`, or `spaces`)  
  **or add a new category if the existing ones don’t suit it**
- Prioritize **human legibility**—we don’t want to confuse real users

> 💡 Tools like [Unicode Utilities: Confusables](https://util.unicode.org/UnicodeJsps/confusables.jsp) are great for finding visually similar characters.

---

## 🧪 Testing Your Changes

Before submitting a PR:

- Run the app locally and make sure it works as expected
- Confirm that spoofed characters are readable
- Check that your additions don’t break the stats or character tables

---

## 📬 How to Submit

1. **Fork** this repository
2. **Clone** your fork locally
3. **Create a new branch** (e.g. `feat/add-homoglyphs`)
    ```bash
    git checkout -b feat/add-homoglyphs
    ```
4. **Commit** your changes using [Conventional Commits](https://www.conventionalcommits.org/):
    ```bash
    git commit -am "feat(letters): add homoglyphs for G and K"
    ```
5. **Push** to your fork
    ```bash
    git push origin feat/add-homoglyphs
    ```
6. **Open a pull request** from your branch to this repo

---

## 🙏 Thank You!

Thanks for helping improve this tool! Every contribution makes the project better and more comprehensive for everyone.
