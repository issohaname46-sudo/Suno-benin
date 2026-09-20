# SUNO BÉNIN 🇧🇯

Application Next.js pour envoyer des paroles à une API de génération musicale.

## Déploiement Vercel

1. Importer ce dossier dans GitHub.
2. Importer le dépôt dans Vercel.
3. Dans **Settings → Environment Variables**, ajouter :
   - `SUNO_API_KEY` = ta clé API
4. Redéployer.

Ne mets jamais ta vraie clé API dans GitHub ou dans `page.tsx`.

## WhatsApp

Le bouton de commande utilise le numéro configuré dans `app/page.tsx`.

## Important

Les paramètres exacts et le format de réponse de l'API dépendent du fournisseur d'API utilisé. Vérifie sa documentation avant la mise en production.
