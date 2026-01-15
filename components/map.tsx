"use client";

interface MapProps {
  width?: string;
  height?: string;
}

export default function Map({ width = "100%", height = "400px" }: MapProps) {
  const src = `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_MAPS_KEY}&q=İzmit+Tenis+Kulübü`;

  return (
    <div className="rounded-lg overflow-hidden border border-border mb-6">
      <iframe
        src={src}
        width={width}
        height={height}
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
