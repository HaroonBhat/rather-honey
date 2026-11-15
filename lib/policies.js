import { CONFIG } from './config';

const contactLine = (
  <>
    Questions about this policy? Write to{' '}
    <a href={`mailto:${CONFIG.contact.email}`}>{CONFIG.contact.email}</a> or call{' '}
    <a href={`tel:${CONFIG.contact.phoneRaw}`}>{CONFIG.contact.phone}</a>.
  </>
);

export const policies = {
  'privacy': {
    title: 'Privacy Policy',
    updated: '15 November 2026',
    intro: `${CONFIG.legalName} collects the smallest amount of information needed to take your order and get it to you. This page explains what we keep and how it is used.`,
    sections: [
      {
        heading: 'What we collect',
        body: (
          <ul>
            <li>Contact details you enter at checkout: name, email address, phone number.</li>
            <li>Shipping address and any delivery notes you add.</li>
            <li>Order contents and order history, so we can resolve queries and ship replacements.</li>
            <li>Account details if you create one: your name, email, phone and a hashed password.</li>
            <li>Your newsletter email address if you choose to subscribe.</li>
          </ul>
        ),
      },
      {
        heading: 'How we use it',
        body: (
          <p>
            To confirm and dispatch your order, to reply to messages, to handle returns under our{' '}
            {CONFIG.commerce.returnWindow}, and — only if you opted in — to send occasional harvest
            notes. We do not sell or rent your details to anyone.
          </p>
        ),
      },
      {
        heading: 'Payments',
        body: (
          <p>
            Orders placed on this storefront are currently payable by cash on delivery. When online
            payments are enabled, card and UPI details will be handled by our payment gateway; this
            storefront never receives or stores your card number.
          </p>
        ),
      },
      {
        heading: 'Cookies and local storage',
        body: (
          <p>
            We keep your bag and sign-in session in your browser so the store works. We do not run
            third-party advertising trackers on this site.
          </p>
        ),
      },
      {
        heading: 'Your choices',
        body: (
          <p>
            You can ask us to correct or delete your details at any time by writing to{' '}
            <a href={`mailto:${CONFIG.contact.email}`}>{CONFIG.contact.email}</a>. Newsletter emails
            include a simple way to stop them.
          </p>
        ),
      },
      { heading: 'Contact', body: <p>{contactLine}</p> },
    ],
  },

  'terms': {
    title: 'Terms & Conditions',
    updated: '15 November 2026',
    intro: `By placing an order on this website you agree to the terms below. They are written to be read — if anything is unclear, ask us before ordering.`,
    sections: [
      {
        heading: 'Orders',
        body: (
          <p>
            An order is confirmed once payment method and delivery details are accepted. We may contact
            you by phone or email to confirm an order. If a product is unavailable we will offer a
            replacement or refund the affected amount.
          </p>
        ),
      },
      {
        heading: 'Pricing',
        body: (
          <p>
            All prices are in Indian Rupees (₹) and inclusive of applicable taxes. Delivery is free on
            orders over ₹{CONFIG.commerce.freeShippingThreshold}; a flat ₹{CONFIG.commerce.shippingFlatRate}{' '}
            applies below that.
          </p>
        ),
      },
      {
        heading: 'Delivery',
        body: (
          <p>
            We dispatch within {CONFIG.commerce.shippingWindow}. Delivery timelines depend on the
            courier and your location. Addresses within India only at present.
          </p>
        ),
      },
      {
        heading: 'Returns',
        body: (
          <p>
            Every jar is covered by our {CONFIG.commerce.returnWindow}. If a jar arrives damaged or is
            not what you ordered, contact us with your order number and a photo and we will replace or
            refund it.
          </p>
        ),
      },
      {
        heading: 'Product information',
        body: (
          <p>
            Honey is a natural product: colour, texture and crystallisation vary between seasons. Our
            shilajit is sold as a natural wellness product, not as a medicine, and is not intended to
            diagnose, treat or cure any condition. Please consult a qualified practitioner if you are
            unsure whether it suits you.
          </p>
        ),
      },
      {
        heading: 'Accounts',
        body: (
          <p>
            Keep your account password private. You are responsible for orders placed from your signed-in
            session. Tell us immediately if you think someone else has access.
          </p>
        ),
      },
      { heading: 'Contact', body: <p>{contactLine}</p> },
    ],
  },

  'shipping-returns': {
    title: 'Shipping & Return Policy',
    updated: '15 November 2026',
    intro: `Everything about getting your jars to you — and what happens if something goes wrong.`,
    sections: [
      {
        heading: 'Dispatch',
        body: (
          <p>
            Orders are packed in small batches and dispatched within {'2–3 business days'}. You will
            receive confirmation by email, and we are reachable on WhatsApp for delivery questions.
          </p>
        ),
      },
      {
        heading: 'Delivery charges',
        body: (
          <ul>
            <li>Free delivery on orders over ₹{CONFIG.commerce.freeShippingThreshold}.</li>
            <li>Flat ₹{CONFIG.commerce.shippingFlatRate} delivery below that.</li>
            <li>Cash on delivery available across India.</li>
          </ul>
        ),
      },
      {
        heading: 'Delivery timelines',
        body: (
          <p>
            Typical delivery within Kashmir is 2–4 days after dispatch; the rest of India usually takes
            4–7 days. Remote areas can take longer. Couriers do not deliver on public holidays.
          </p>
        ),
      },
      {
        heading: 'Damaged or wrong items',
        body: (
          <p>
            Tell us within 7 days of delivery with your order number and a photo of the jar and packing.
            We will arrange a replacement or a refund. Please keep the packaging until we confirm.
          </p>
        ),
      },
      {
        heading: 'Returns and the money-back guarantee',
        body: (
          <p>
            Every jar is covered by our {CONFIG.commerce.returnWindow}. If you are not happy with your
            order, contact us and we will work it out — including a refund where the guarantee applies.
            Refunds are returned by the method agreed with you, within 7 business days of approval.
          </p>
        ),
      },
      {
        heading: 'Address changes',
        body: (
          <p>
            We can usually update an address before dispatch. Call{' '}
            <a href={`tel:${CONFIG.contact.phoneRaw}`}>{CONFIG.contact.phone}</a> with your order number
            as soon as possible; after dispatch, changes depend on the courier.
          </p>
        ),
      },
      { heading: 'Contact', body: <p>{contactLine}</p> },
    ],
  },
};

export const policySlugs = Object.keys(policies);
