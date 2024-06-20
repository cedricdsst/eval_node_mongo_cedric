
# Projet Flipper Management

Modélisation de collections MongoDB et création d'une api nodeJs

## Modèles

### Modèle `Brand`

```typescript
import { Schema, model } from 'mongoose';

const brandSchema = new Schema({
    name: { type: String, required: true, unique: true },
    logo: { type: String }
});

const Brand = model('Brand', brandSchema);
```

**Choix** :
- **`name`** : Obligatoire et unique pour éviter les doublons.
- **`logo`** : Optionnel si la marque n'a pas de logo.

### Modèle `Flipper`

```typescript
import { Schema, model, Types } from 'mongoose';

const flipperSchema = new Schema({
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    condition: { type: String, required: true },
    availability: { type: String, required: true },
    brand: { type: Types.ObjectId, ref: 'Brand', required: true },
    releaseDate: { type: Date, required: true },
    rating: { type: Number, required: true, min: 0, max: 5 },
    mainImage: { type: String, required: true },
    additionalImages: { type: [String] },
    additionalInfo: { type: String }
});

const Flipper = model('Flipper', flipperSchema);
```

**Choix** :
- **`brand`** : Référence à la collection `Brand` pour l'intégrité des données.
- **`mainImage`** : Pour définir quel est l'image principale à afficher sur la carte produit.

## Optimisations MongoDB (2 points)

1. **Améliorer la recherche par nom de flipper** : Ajouter un index textuel sur le champ `name`.
2. **Accélérer la présentation en liste des flippers sur la page d'accueil** : Créer des indexes sur les champs utilisés fréquemment comme `name` et `price`.


## Exports


### `Flippers`

```typescript
[
    {
        "_id": "6674307a08edfdb573f7189e",
        "name": "Flipper Revenge from Mars",
        "price": 2600,
        "condition": "Used",
        "availability": "Consult",
        "brand": "60d0fe4f5311236168a109ca",
        "releaseDate": "1998-01-01T00:00:00.000Z",
        "rating": 3.5,
        "mainImage": "http://example.com/images/flipper-revenge-main.jpg",
        "additionalImages": [
            "http://example.com/images/flipper-revenge-1.jpg",
            "http://example.com/images/flipper-revenge-2.jpg",
            "http://example.com/images/flipper-revenge-3.jpg"
        ],
        "__v": 0
    },
    {
        "_id": "6674312208edfdb573f718a1",
        "name": "Flipper Cactus Canyon",
        "price": 6100,
        "condition": "Used",
        "availability": "Consult",
        "brand": "60d0fe4f5311236168a109ca",
        "releaseDate": "1998-01-01T00:00:00.000Z",
        "rating": 4.1,
        "mainImage": "http://example.com/images/flipper-cactus-canyon-main.jpg",
        "additionalImages": [
            "http://example.com/images/flipper-cactus-canyon-1.jpg",
            "http://example.com/images/flipper-cactus-canyon-2.jpg",
            "http://example.com/images/flipper-cactus-canyon-3.jpg"
        ],
        "__v": 0
    },
    {
        "_id": "6674317a08edfdb573f718a3",
        "name": "Flipper Champion Pub",
        "price": 3600,
        "condition": "New",
        "availability": "Out of stock",
        "brand": "66742e132a66cd6089abe398",
        "releaseDate": "1998-01-01T00:00:00.000Z",
        "rating": 3.9,
        "mainImage": "http://example.com/images/flipper-champion-pub-main.jpg",
        "additionalImages": [
            "http://example.com/images/flipper-champion-pub-1.jpg",
            "http://example.com/images/flipper-champion-pub-2.jpg",
            "http://example.com/images/flipper-champion-pub-3.jpg"
        ],
        "__v": 0
    },
    {
        "_id": "667431da08edfdb573f718a5",
        "name": "Flipper Cirqus Voltaire",
        "price": 7100,
        "condition": "Used",
        "availability": "Out of stock",
        "brand": "66742e642a66cd6089abe39a",
        "releaseDate": "1997-01-01T00:00:00.000Z",
        "rating": 4.2,
        "mainImage": "http://example.com/images/flipper-cirqus-voltaire-main.jpg",
        "additionalImages": [
            "http://example.com/images/flipper-cirqus-voltaire-1.jpg",
            "http://example.com/images/flipper-cirqus-voltaire-2.jpg",
            "http://example.com/images/flipper-cirqus-voltaire-3.jpg"
        ],
        "__v": 0
    }
]
```

### `Brands`

```typescript
[
    {
        "_id": "60d0fe4f5311236168a109ca",
        "name": "Bally",
        "logo": "http://example.com/logos/bally-logo.png",
        "__v": 0
    },
    {
        "_id": "66742e132a66cd6089abe398",
        "name": "Stern",
        "logo": "http://example.com/logos/stern-logo.png",
        "__v": 0
    },
    {
        "_id": "66742e642a66cd6089abe39a",
        "name": "Sega",
        "logo": "http://example.com/logos/sega-logo.png",
        "__v": 0
    }
]
```