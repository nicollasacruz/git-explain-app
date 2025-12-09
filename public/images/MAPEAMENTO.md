# Mapeamento de Imagens DALL-E

## Imagens Disponíveis

| Ficheiro Original | Nome Descritivo | Uso | Onde Usar |
|-------------------|-----------------|-----|-----------|
| img01.png | hero.png | Hero da Landing Page | `src/app/page.tsx` |
| img02.png | ato-1-caos.png | Ato 1: O Caos | `src/app/(palestra)/ato-1/page.tsx` |
| img03.png | ato-2-descoberta.png | Ato 2: Conventional Commits | `src/app/(palestra)/ato-2/page.tsx` |
| img04.png | ato-2-gitflow.png | Ato 2: Git Flow Diagram | `src/app/(palestra)/ato-2/page.tsx` |
| img05.png | ato-2-semver.png | Ato 2: Semantic Versioning | `src/app/(palestra)/ato-2/page.tsx` |
| img06.png | ato-3-transformacao.png | Ato 3: A Transformação | `src/app/(palestra)/ato-3/page.tsx` |
| img07.png | ato-4-novo-mundo.png | Ato 4: O Novo Mundo | `src/app/(palestra)/ato-4/page.tsx` |
| img08.png | exercicios-quiz.png | Exercícios - Quiz | Páginas de exercícios |
| img09.png | exercicios-terminal.png | Exercícios - Terminal | Exercício 6 |
| img10.png | mascote.png | Mascote da Aplicação | Navbar, footer, loading |

## Comandos para Renomear

```bash
cd /Users/nicollascruz/projects/git-flow-explain/public/images

# Renomear todas as imagens
mv img01.png hero.png
mv img02.png ato-1-caos.png
mv img03.png ato-2-descoberta.png
mv img04.png ato-2-gitflow.png
mv img05.png ato-2-semver.png
mv img06.png ato-3-transformacao.png
mv img07.png ato-4-novo-mundo.png
mv img08.png exercicios-quiz.png
mv img09.png exercicios-terminal.png
mv img10.png mascote.png
```

## Uso nas Páginas

### Landing Page (src/app/page.tsx)
```tsx
import Image from 'next/image'

<Image
  src="/images/hero.png"
  alt="Git Flow Collaboration"
  width={1200}
  height={675}
  priority
/>
```

### Atos
```tsx
<Image
  src="/images/ato-1-caos.png"
  alt="O Caos nos Commits"
  width={800}
  height={600}
/>
```

### Mascote
```tsx
<Image
  src="/images/mascote.png"
  alt="Git Flow Octopus"
  width={100}
  height={100}
  className="w-16 h-16"
/>
```

## Tamanhos das Imagens

- **hero.png**: 5.2MB (otimizar para web)
- **ato-1-caos.png**: 5.6MB (otimizar)
- **ato-2-descoberta.png**: 5.5MB (otimizar)
- **ato-2-gitflow.png**: 1.4MB
- **ato-2-semver.png**: 948KB
- **ato-3-transformacao.png**: 1.4MB
- **ato-4-novo-mundo.png**: 1.4MB
- **exercicios-quiz.png**: 1.1MB
- **exercicios-terminal.png**: 1.1MB
- **mascote.png**: 1.1MB

**Recomendação**: Otimizar as 3 primeiras imagens (>5MB) usando:
```bash
# Com ImageMagick
convert hero.png -quality 85 -resize 1920x1080 hero-optimized.png

# Ou usar https://tinypng.com
```
