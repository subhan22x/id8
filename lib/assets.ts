export type EmblemAsset = {
  id: string;
  label: string;
  src: string;
};

export type PendantStyle = {
  id: string;
  label: string;
  src: string;
  accent?: string;
};

export const pendantStyles: PendantStyle[] = [
  { id: "deja", label: "Deja", src: "/pendants/deja.png" },
  { id: "lexy", label: "Lexy", src: "/pendants/lexy.png" },
  { id: "king", label: "King", src: "/pendants/king.png" },
  { id: "jhon", label: "Jhon", src: "/pendants/jhon.png" },
  { id: "jwae", label: "Jwae", src: "/pendants/jwae.png" },
  { id: "neiko", label: "Neiko", src: "/pendants/neiko.png" }
];

export const emblems: EmblemAsset[] = [
  { id: "moneybag", label: "Money Bag", src: "/emblems/moneybag emblem.png" },
  { id: "heart", label: "Heart", src: "/emblems/heart emblem.png" },
  { id: "butterfly", label: "Butterfly", src: "/emblems/BUTTERFLY EMBLEM.png" },
  { id: "spade", label: "Spade", src: "/emblems/SPADE EMBLEM.png" },
  { id: "crown", label: "Crown", src: "/emblems/CROWN EMBLEM.png" }
];