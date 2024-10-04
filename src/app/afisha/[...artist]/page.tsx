"use client";

import { useParams } from "next/navigation";
import { useDataContext } from "@/context/DataContext";
import { useMemo } from "react";
import { SupplierCard } from "@/components/SupplierCard";
import { Text } from "@/components/Text";

import "./styles.scss";
import { Button } from "@/components/Button";

export default function ArtistPage() {
  const { artist: params } = useParams();
  const { suppliers } = useDataContext();

  const [currentArtist] = params;

  const artistPreapred = useMemo(() => suppliers?.[currentArtist], [suppliers]);

  return (
    <div className="afisha page clearfix">
      <div className="suppliers__content suppliers__content_card">
        <Button href="/afisha" style="clear">
          <Text className="afisha__title" title="Афиша" titleSize="h2" />
        </Button>
        <div className="suppliers__card">
          {artistPreapred && (
            <SupplierCard supplier={artistPreapred} showImage />
          )}
        </div>
      </div>
    </div>
  );
}
