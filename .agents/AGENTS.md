# MADHUR ECOSYSTEM ENGINEERING STANDARDS

## Philosophy

The Madhur ecosystem is NOT a role-based application.

It is a collection of independent SaaS products.

Every application should feel like it could be shipped independently.

They only share backend services and the design system.

---

## Shared Packages

Only these packages may be shared.

- @madhur/ui
- @madhur/design-system
- @madhur/api
- @madhur/auth
- @madhur/types
- @madhur/utils

Applications must never import pages, layouts, or features from another application.

---

## Forbidden

Never copy a page from another application.

Never import layouts from another application.

Never reuse navigation.

Never reuse dashboard structures.

Never implement role switching.

Never render another application's components.

---

## Application Identity

Listener
Product: Madhur Music
Audience: Music Consumers

Artist
Product: Madhur Studio
Audience: Recording Artists

Music Label
Product: Madhur Label Hub
Audience: Label Managers

Podcast
Product: Madhur Podcast Studio
Audience: Podcast Creators

Promoter
Product: Madhur Events
Audience: Event Organizers

Moderator
Product: Madhur Trust & Safety
Audience: Content Moderation

Administrator
Product: Madhur Console
Audience: Platform Operations

---

## UX Rule

Before creating any page ask:

"If this product existed on its own, how would this workflow be designed?"

Never adapt another application's UI.

Design for the target user.

---

## Engineering Standards

Follow SOLID.

Follow DRY.

Follow Clean Architecture.

Prefer composition over inheritance.

No duplicated business logic.

No duplicated layouts.

No duplicated navigation.

Use feature modules.

Use reusable hooks.

Use reusable services.

Use reusable API clients.

---

## Definition of Done

A feature is only complete if:

- Production-ready
- Responsive
- Accessible
- Typed
- Tested
- Error handled
- Loading states implemented
- Empty states implemented
- Mobile friendly
- Uses shared design system
