import { Blocks } from "@/lib/types";
import { BLOCK_COMPONENTS } from "./items";

interface BlockRendererProps {
  block: Blocks;
  index: number;
  pagePreviewAttr?: Record<string, any>;
}

/**
 * BlockRenderer delegates each modular block to its dedicated React component.
 * Uses the centralized BLOCK_COMPONENTS registry for automatic dispatching.
 */
export default function BlockRenderer({
  block,
  index,
  pagePreviewAttr,
}: BlockRendererProps) {
  const blockPreviewAttr = pagePreviewAttr?.[`blocks__${index}`];

  // Zoek het type van het blok op in de registry
  const blockType = Object.keys(block).find((key) => BLOCK_COMPONENTS[key]);
  if (!blockType) return null;

  const Component = BLOCK_COMPONENTS[blockType];
  const blockData = block[blockType as keyof Blocks];

  return (
    <Component
      data={blockData}
      previewAttr={blockPreviewAttr}
    />
  );
}
