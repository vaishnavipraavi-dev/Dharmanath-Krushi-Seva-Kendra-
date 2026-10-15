# Pages and routing

These files export React page components. Routes are declared explicitly in `src/App.tsx` using React Router, with lazy loading for each page.

`products.$slug.tsx` renders `/products/:slug` and reads the slug with `useParams`. Product filters, crop selections and enquiry prefills use `useSearchParams`. Navigation links use the `routeHref` helper to encode query parameters. Unknown routes and product slugs render the shared `NotFound` component.

Register new pages and their metadata in `src/App.tsx`. Static hosting must serve `index.html` for frontend routes; see the project README.
