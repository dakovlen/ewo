import { PAGE_QUERYResult } from "@/sanity/types";

type FeaturesProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["content"]>[number],
  { _type: "features" }
>;

export function Features({ features, title }: FeaturesProps) {
  return (
    <section className="container mx-auto flex flex-col gap-12 py-16 px-4 sm:px-6 lg:px-8">
      {title ? (
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-center text-slate-800 max-w-4xl mx-auto text-pretty">
          {title}
        </h2>
      ) : null}

      {Array.isArray(features) ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature) => (
            <div key={feature._key} className="flex flex-col gap-3">
              <h3 className="text-lg sm:text-xl font-semibold text-slate-800">
                {feature.title}
              </h3>
              <p className="text-base sm:text-lg text-slate-600">
                {feature.text}
              </p>
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}
