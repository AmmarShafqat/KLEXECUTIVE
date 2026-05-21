import { gql } from 'graphql-request'
import { getClient, ORG_SLUG } from './graphql-client'

// ── Vehicle classes ────────────────────────────────────────────────────────
export type VehicleClass = {
  slug: string
  displayName: string
  description: string | null
  capacity: number
  sortOrder: number
  imageUrl: string | null
}

const VEHICLE_CLASSES_QUERY = gql`
  query VehicleClasses($orgSlug: String!) {
    vehicleClasses(orgSlug: $orgSlug) {
      slug
      displayName
      description
      capacity
      sortOrder
      imageUrl
    }
  }
`

export async function fetchVehicleClasses(): Promise<VehicleClass[]> {
  const data = await getClient().request<{ vehicleClasses: VehicleClass[] }>(
    VEHICLE_CLASSES_QUERY,
    { orgSlug: ORG_SLUG },
  )
  return [...data.vehicleClasses].sort((a, b) => a.sortOrder - b.sortOrder)
}

// ── Calculate quote ────────────────────────────────────────────────────────
export type QuoteLine = {
  label: string
  amountCents: number
  note: string | null
}

export type Quote = {
  className: string
  lines: QuoteLine[]
  subtotalCents: number
  gratuityCents: number
  totalCents: number
  notes: string[]
}

export type QuoteInput = {
  pickup: string
  destination: string
  pickupAt: string // ISO 8601
  miles: number
  minutes: number
  vehicleClass: string
}

const CALCULATE_QUOTE_MUTATION = gql`
  mutation CalculateQuote($input: QuoteInput!) {
    calculateQuote(input: $input) {
      className
      subtotalCents
      gratuityCents
      totalCents
      lines {
        label
        amountCents
        note
      }
      notes
    }
  }
`

export async function calculateQuote(input: QuoteInput): Promise<Quote> {
  const data = await getClient().request<{ calculateQuote: Quote }>(
    CALCULATE_QUOTE_MUTATION,
    { input: { ...input, orgSlug: ORG_SLUG } },
  )
  return data.calculateQuote
}

// ── Create order ───────────────────────────────────────────────────────────
export type CreateOrderInput = {
  customerName: string
  customerEmail: string
  customerPhone: string
  pickup: string
  destination: string
  pickupAt: string
  miles: number
  minutes: number
  vehicleClass: string
  passengers?: number
  notes?: string
}

export type Order = {
  id: string
  customerName: string
  customerEmail: string
  customerPhone: string
  pickup: string
  destination: string
  pickupAt: string
  miles: number
  minutes: number
  vehicleClass: string
  subtotalCents: number
  gratuityCents: number
  totalCents: number
  currency: string
  status: string
  createdAt: string
}

export type CreateOrderResult = {
  order: Order
  clientSecret: string
}

const CREATE_ORDER_MUTATION = gql`
  mutation CreateOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      clientSecret
      order {
        id
        customerName
        customerEmail
        customerPhone
        pickup
        destination
        pickupAt
        miles
        minutes
        vehicleClass
        subtotalCents
        gratuityCents
        totalCents
        currency
        status
        createdAt
      }
    }
  }
`

export async function createOrder(
  input: CreateOrderInput,
): Promise<CreateOrderResult> {
  const data = await getClient().request<{ createOrder: CreateOrderResult }>(
    CREATE_ORDER_MUTATION,
    { input: { ...input, orgSlug: ORG_SLUG } },
  )
  return data.createOrder
}

// ── Submit contact inquiry ─────────────────────────────────────────────────
export type ContactInquiryInput = {
  name: string
  company?: string
  email: string
  phone?: string
  serviceInterest?: string
  message?: string
}

const SUBMIT_CONTACT_INQUIRY_MUTATION = gql`
  mutation SubmitContactInquiry($input: ContactInquiryInput!) {
    submitContactInquiry(input: $input)
  }
`

export async function submitContactInquiry(
  input: ContactInquiryInput,
): Promise<string> {
  const data = await getClient().request<{ submitContactInquiry: string }>(
    SUBMIT_CONTACT_INQUIRY_MUTATION,
    { input: { ...input, orgSlug: ORG_SLUG } },
  )
  return data.submitContactInquiry
}
