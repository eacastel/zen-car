import React from "react"

export default function LandingSection({
  id,
  eyebrow,
  title,
  description,
  background = "bg-white",
  children,
}) {
  return (
    <section id={id} className={`py-16 ${background}`}>
      <div className="container mx-auto px-4 md:px-6 lg:max-w-[1280px]">
        {(eyebrow || title || description) && (
          <div className="max-w-4xl mb-10">
            {eyebrow && (
              <p className="text-sm tracking-[0.12em] text-accent font-pirulen mb-4">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="text-3xl md:text-4xl font-medium text-primary mb-4">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-lg text-primary/80 max-w-3xl">{description}</p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}
