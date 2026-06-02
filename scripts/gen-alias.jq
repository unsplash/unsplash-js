"import { components } from \"./unsplash.d.ts\";",
(.components.schemas
| keys[]
| "export type \(. | sub("\\."; ""; "g")) = components[\"schemas\"][\"\(.)\"];")
