# Alyra-Dapp

## Méthode de GIT
Logique git flow 
1) Affecte toi le ticket
2) Créer la branche à partir de `main`
```
git switch main
git pull origin
git switch -c DAPPxxx
```
### Pour commit 
[DAPPxxx][doc|feat|fix|style]: gitmoji Update documentation for git command

3) push
```
git push orgin DAPPxxx
```
4) Pull Requests
- Demande peer en review
5) valide + merge (si dernier commit)
5bis) REBASE OBLIGATOIRE sur dernier commit main.

### Consigne 
### Votre Dapp doit permettre : 
- l’enregistrement d’une liste blanche d'électeurs. 
- à l'administrateur de commencer la session d'enregistrement de la proposition.
- aux électeurs inscrits d’enregistrer leurs propositions.
- à l'administrateur de mettre fin à la session d'enregistrement des propositions.
- à l'administrateur de commencer la session de vote.
- aux électeurs inscrits de voter pour leurs propositions préférées.
- à l'administrateur de mettre fin à la session de vote.
- à l'administrateur de comptabiliser les votes.
- à tout le monde de consulter le résultat.

### Les recommandations et exigences 
- Votre code doit être optimal. 
- Votre Dapp doit être sécurisée. 
- Vous devez utiliser la box react de Truffle.

### A rendre :
- Lien vers votre répertoire Github, comprenant:
- Lien vers vidéo démo des fonctionnalités de votre Front.
- Le lien vers un déploiement public de votre dapp (Heroku / GhPages, AWS, Vercel...)
