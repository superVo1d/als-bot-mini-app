"use client";

import { useParams } from "next/navigation";
import { useDataContext } from "@/context/DataContext";
import { useMemo } from "react";
import { SupplierCard } from "@/components/SupplierCard";

import "./styles.scss";

export default function ArtistPage() {
  const { artist: params } = useParams();
  const { suppliers } = useDataContext();

  console.log(params);

  const [currentArtist] = params;

  const artistPreapred = useMemo(() => suppliers?.[currentArtist], [suppliers]);

  return (
    <div className="afisha page clearfix">
      <div className="suppliers__content suppliers__content_card">
        <div className="suppliers__card">
          {artistPreapred && (
            <SupplierCard supplier={artistPreapred} showImage />
          )}
        </div>
      </div>
    </div>
  );
}
