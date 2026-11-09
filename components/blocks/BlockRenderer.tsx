import { Blocks, CSLPContainer } from "@/lib/types";
import { BLOCK_COMPONENTS } from "./items";

interface BlockRendererProps {
  block: Blocks;
  index: number;
  pagePreviewAttr?: CSLPContainer;
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

  const blockType = Object.keys(block).find((key) => BLOCK_COMPONENTS[key]);
  if (!blockType) return null;

  const Component = BLOCK_COMPONENTS[blockType];
  const blockData = block[blockType as keyof Blocks];

  return (
    <Component
      data={blockData as never}
      previewAttr={blockPreviewAttr}
    />
  );
}
