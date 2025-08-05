import { Hero } from "@/components/blocks/Hero"
import { SocialTiles } from "@/components/social/SocialTiles";


export default function ContactPage() {
  return (
    <>
      <Hero
        _key="hero-contact"
        _type="hero"
        title="Contact ElderlyWisdom: Let’s Stay Connected"
        text={[
          {
            _type: "block",
            style: "normal",
            markDefs: [],
            _key: "block-contact-1",
            children: [
              {
                _type: "span",
                _key: "span-contact-1",
                text:
                  "We'd love to hear from you. Whether you're a senior looking for guidance, a family member seeking resources, or a reader with suggestions – our inbox is always open. Reach out and become a part of the ElderlyWisdom community.",
              },
            ],
          },
          {
            _type: "block",
            style: "normal",
            markDefs: [],
            _key: "block-contact-2",
            children: [
              {
                _type: "span",
                _key: "span-contact-2",
                text:
                  "For media inquiries, collaboration ideas, or questions about our content, feel free to email us directly or connect via our YouTube channel.",
              },
            ],
          },
        ]}
        image={undefined}
      />

      <section className="container mx-auto px-4 py-20 text-center flex justify-center">
        <SocialTiles />
      </section>
    </>
  );
}
