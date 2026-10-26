import type { VisualKey } from "@/types/content";
import { CloudVisual } from "./CloudVisual";
import { ShieldVisual } from "./ShieldVisual";
import { BrowserMockup } from "./BrowserMockup";
import { PhoneMockup } from "./PhoneMockup";
import { ArchitectureVisual, DataPipelineVisual, EnterpriseVisual, TestingVisual } from "./FlowVisuals";
import { NeuralNetwork } from "./NeuralNetwork";
import { PipelineMini } from "./PipelineMini";

/** Hero illustration for service and solution pages, keyed by content `visual`. */
export function ServiceVisual({ visual }: { visual: VisualKey }) {
  switch (visual) {
    case "cloud":
      return <CloudVisual />;
    case "shield":
      return <ShieldVisual />;
    case "browser":
      return <BrowserMockup />;
    case "phone":
      return (
        <div className="py-4 [perspective:1200px]">
          <div data-tilt>
            <PhoneMockup />
          </div>
        </div>
      );
    case "data":
      return <DataPipelineVisual />;
    case "architecture":
      return <ArchitectureVisual />;
    case "testing":
      return <TestingVisual />;
    case "enterprise":
      return <EnterpriseVisual />;
    case "neural":
      return (
        <div className="aspect-[5/4] w-full">
          <NeuralNetwork dense />
        </div>
      );
    case "pipeline":
      return <PipelineMini />;
  }
}
