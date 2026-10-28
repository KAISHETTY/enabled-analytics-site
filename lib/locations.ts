/**
 * Where Enabled Analytics operates. Offices and addresses come from the
 * enabledanalytics.com footer and site copy (Dubai), and Australia from the
 * 7 Apr 2025 press release ("delivers solutions across the USA, Singapore,
 * Australia, and India"). No Australian city is published, so that pin sits at
 * the country's centre and is labelled as a delivery region.
 */
export type Location = {
  id: string
  city: string
  country: string
  flag: string
  lon: number
  lat: number
  kind: "HQ" | "Office" | "Delivery"
  detail: string
}

export const locations: Location[] = [
  { id: "us", city: "Lewisville, Texas", country: "United States", flag: "/images/flags/us.svg", lon: -96.99, lat: 33.05, kind: "HQ", detail: "209 State Highway 121 Bypass, Suite # 36, Lewisville, TX 75067" },
  { id: "in", city: "Hyderabad", country: "India", flag: "/images/flags/in.svg", lon: 78.38, lat: 17.44, kind: "Office", detail: "Vamsiram Suvarnadurga Tech Park, Nanakramguda, Hyderabad, Telangana 500032" },
  { id: "ae", city: "Dubai", country: "United Arab Emirates", flag: "/images/flags/ae.svg", lon: 55.27, lat: 25.2, kind: "Office", detail: "Part of our presence across three continents" },
  { id: "sg", city: "Singapore", country: "Singapore", flag: "/images/flags/sg.svg", lon: 103.86, lat: 1.29, kind: "Office", detail: "Level 42, Suntec Tower Three, 8 Temasek Boulevard, Singapore 038988" },
  { id: "au", city: "Australia", country: "Australia", flag: "/images/flags/au.svg", lon: 134, lat: -25.5, kind: "Delivery", detail: "Salesforce delivery for clients across Australia" },
]
