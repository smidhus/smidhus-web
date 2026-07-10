"use client";

import React, { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";

interface MermaidProps {
  chart: string;
  diagramNumber?: number;
}

interface PanState {
  isPanning: boolean;
  startX: number;
  startY: number;
  scrollLeft: number;
  scrollTop: number;
}

function extractDiagramData(chart: string) {
  const lines = chart.trim().split(/\r?\n/);
  const captionLine = lines[0]?.match(/^%%\s*caption:\s*(.+)$/i);

  if (!captionLine) {
    return {
      caption: "Technical architecture diagram",
      chart: chart.trim(),
    };
  }

  return {
    caption: captionLine[1].trim(),
    chart: lines.slice(1).join("\n").trim(),
  };
}

export default function Mermaid({ chart, diagramNumber = 1 }: MermaidProps) {
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [diagramZoom, setDiagramZoom] = useState(1);
  const [isPanning, setIsPanning] = useState(false);
  const chartIdRef = useRef<string>("");
  const panContainerRef = useRef<HTMLDivElement | null>(null);
  const panStateRef = useRef<PanState>({
    isPanning: false,
    startX: 0,
    startY: 0,
    scrollLeft: 0,
    scrollTop: 0,
  });
  const { caption, chart: renderableChart } = extractDiagramData(chart);
  const zoomPercentage = Math.round(diagramZoom * 100);
  const modalDiagramWidth =
    diagramZoom === 1 ? { width: "100%", maxWidth: "1100px" } : { width: `${1100 * diagramZoom}px`, maxWidth: "none" };
  const showDomainLegend =
    renderableChart.includes("Rephora Mobile Client") &&
    renderableChart.includes("AWS Cognito Identity") &&
    renderableChart.includes("Spring Boot Resource Server");

  const openExpandedView = () => {
    setDiagramZoom(1);
    setIsExpanded(true);
  };

  const closeExpandedView = () => {
    setIsExpanded(false);
    setIsPanning(false);
    panStateRef.current.isPanning = false;
  };

  const zoomIn = () => {
    setDiagramZoom((current) => Math.min(2, Number((current + 0.25).toFixed(2))));
  };

  const zoomOut = () => {
    setDiagramZoom((current) => Math.max(0.75, Number((current - 0.25).toFixed(2))));
  };

  const resetZoom = () => {
    setDiagramZoom(1);
  };

  const stopPanning = () => {
    if (!panStateRef.current.isPanning) return;

    panStateRef.current.isPanning = false;
    setIsPanning(false);
  };

  const startPanning = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 || !panContainerRef.current) return;

    const container = panContainerRef.current;
    panStateRef.current = {
      isPanning: true,
      startX: event.clientX,
      startY: event.clientY,
      scrollLeft: container.scrollLeft,
      scrollTop: container.scrollTop,
    };
    setIsPanning(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const movePanning = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!panStateRef.current.isPanning || !panContainerRef.current) return;

    event.preventDefault();
    const container = panContainerRef.current;
    container.scrollLeft = panStateRef.current.scrollLeft - (event.clientX - panStateRef.current.startX);
    container.scrollTop = panStateRef.current.scrollTop - (event.clientY - panStateRef.current.startY);
  };

  const handlePreviewKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openExpandedView();
    }
  };

  useEffect(() => {
    chartIdRef.current = `mermaid-${Math.random().toString(36).substring(2, 9)}`;
  }, []);

  useEffect(() => {
    if (!renderableChart || !chartIdRef.current) return;

    let isMounted = true;

    const renderChart = async () => {
      try {
        const mermaidModule = await import("mermaid");
        const mermaid = mermaidModule.default;

        // Dynamically discover all required logos to only load necessary SVGs
        const cleanChart = renderableChart.trim();
        const requiredIcons = Array.from(cleanChart.matchAll(/logos:([a-z0-9-]+)/g)).map((m) => m[1]);

        if (requiredIcons.length > 0) {
          const uniqueIcons = Array.from(new Set(requiredIcons));
          mermaid.registerIconPacks([
            {
              name: "logos",
              loader: () =>
                fetch(`https://api.iconify.design/logos.json?icons=${uniqueIcons.join(",")}`)
                  .then((res) => res.json()),
            },
          ]);
        }

        mermaid.initialize({
          startOnLoad: false,
          theme: "base",
          securityLevel: "loose",
          themeVariables: {
            background: "#07090C",
            primaryColor: "#101418",
            primaryTextColor: "#F4F1E8",
            primaryBorderColor: "#8A7657",
            lineColor: "#E0A96D",
            secondaryColor: "#141B20",
            tertiaryColor: "#16130F",
            nodeBorder: "#8A7657",
            mainBkg: "#101418",
            actorBkg: "#101418",
            actorBorder: "#8A7657",
            actorTextColor: "#F4F1E8",
            signalColor: "#D38B5B",
            signalTextColor: "#F4F1E8",
            labelBoxBkgColor: "#1B2228",
            labelBoxBorderColor: "#3A4650",
            labelTextColor: "#F4F1E8",
            loopTextColor: "#F4F1E8",
            loopBkgColor: "#101418",
            noteBkgColor: "#1A1812",
            noteTextColor: "#F4F1E8",
            noteBorderColor: "#8A7657",
            actorLineColor: "#8A7657",
            activationBkgColor: "#151A1E",
            activationBorderColor: "#8A7657",
            sequenceNumberColor: "#07090C",
          },
        });

        const { svg: renderedSvg } = await mermaid.render(
          chartIdRef.current,
          cleanChart
        );

        if (isMounted) {
          setSvg(renderedSvg);
          setError("");
        }
      } catch (err: unknown) {
        console.error("Mermaid rendering error:", err);
        if (isMounted) {
          setError("Failed to render diagram.");
        }
      }
    };

    renderChart();

    return () => {
      isMounted = false;
    };
  }, [renderableChart]);

  useEffect(() => {
    if (!isExpanded) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeExpandedView();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isExpanded]);

  if (error) {
    return (
      <div className="text-red-500 font-mono text-xs my-4 p-4 border border-red-900 bg-red-950/20 rounded">
        {error}
      </div>
    );
  }

  if (!svg) {
    return (
      <div className="animate-pulse flex items-center justify-center my-6 h-48 border border-dashed border-[#1F242C] rounded bg-[#0A0D10]/20 font-mono text-[10px] text-smidhus-bone-dim/30 uppercase tracking-widest">
        Loading Diagram...
      </div>
    );
  }

  return (
    <figure className="my-8">
      <style>
        {`
          @keyframes diagramFadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes diagramScaleIn {
            from {
              opacity: 0;
              transform: scale(0.985);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
        `}
      </style>
      <div className="border border-dashed border-[#1F242C] rounded-sm bg-[#0A0D10]/20 shadow-[inset_0_0_20px_rgba(0,0,0,0.4)]">
        <div className="flex items-center justify-between gap-3 border-b border-dashed border-[#1F242C] px-3 py-2">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-smidhus-bone-dim/50">
              Diagram preview
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-smidhus-bone-dim/30">
              Click diagram to expand
            </span>
          </div>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              openExpandedView();
            }}
            className="border border-dashed border-[#1F242C] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[#D38B5b] transition-colors hover:border-[#D38B5b] hover:text-smidhus-bone"
            aria-label={`Expand diagram ${diagramNumber}: ${caption}`}
          >
            Expand
          </button>
        </div>

        {isExpanded ? (
          <div className="flex h-48 items-center justify-center p-4 font-mono text-[10px] uppercase tracking-[0.16em] text-smidhus-bone-dim/35">
            Expanded view open
          </div>
        ) : (
          <div
            role="button"
            tabIndex={0}
            onClick={openExpandedView}
            onKeyDown={handlePreviewKeyDown}
            aria-label={`Expand diagram ${diagramNumber}: ${caption}`}
            className="max-h-[420px] w-full cursor-zoom-in overflow-auto p-4 outline-none transition-colors hover:bg-[#D38B5B]/[0.03] focus-visible:ring-1 focus-visible:ring-[#D38B5b] [&>svg]:mx-auto [&>svg]:h-auto [&>svg]:w-full [&>svg]:max-w-[980px]"
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        )}
      </div>

      <figcaption className="mt-2 text-center font-mono text-[10px] uppercase tracking-[0.12em] text-smidhus-bone-dim/45">
        Diagram {diagramNumber}: {caption}
      </figcaption>

      {isExpanded && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Diagram ${diagramNumber}: ${caption}`}
          onClick={closeExpandedView}
          className="fixed inset-0 z-[999] flex animate-[diagramFadeIn_160ms_ease-out] flex-col bg-[#07090C]"
        >
          <div className="flex shrink-0 items-center justify-between gap-4 border-b border-dashed border-[#1F242C] bg-[#07090C] px-4 py-3">
            <div className="min-w-0">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#D38B5b]">
                Diagram {diagramNumber}
              </p>
              <p className="truncate font-mono text-xs uppercase tracking-[0.12em] text-smidhus-bone">
                {caption}
              </p>
            </div>
            {showDomainLegend ? (
              <div className="hidden shrink-0 items-center gap-3 border border-dashed border-[#1F242C] bg-[#0A0D10] px-3 py-2 font-mono text-[9px] uppercase tracking-[0.12em] text-smidhus-bone-dim md:flex">
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 border border-[#4FB7C5] bg-[#4FB7C5]/25" />
                  Mobile
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 border border-[#D9A45F] bg-[#D9A45F]/25" />
                  Cognito
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 border border-[#7AA66A] bg-[#7AA66A]/25" />
                  Backend
                </span>
              </div>
            ) : null}
            <div
              className="flex shrink-0 items-center gap-1 border border-dashed border-[#1F242C] bg-[#0A0D10] p-1"
              onClick={(event) => event.stopPropagation()}
              aria-label="Diagram zoom controls"
            >
              <button
                type="button"
                onClick={zoomOut}
                disabled={diagramZoom <= 0.75}
                className="h-7 min-w-7 px-2 font-mono text-xs text-smidhus-bone-dim transition-colors hover:text-[#D38B5b] disabled:cursor-not-allowed disabled:text-smidhus-bone-dim/20"
                aria-label="Zoom out diagram"
              >
                -
              </button>
              <span className="min-w-12 text-center font-mono text-[10px] uppercase tracking-[0.12em] text-smidhus-bone-dim">
                {zoomPercentage}%
              </span>
              <button
                type="button"
                onClick={zoomIn}
                disabled={diagramZoom >= 2}
                className="h-7 min-w-7 px-2 font-mono text-xs text-smidhus-bone-dim transition-colors hover:text-[#D38B5b] disabled:cursor-not-allowed disabled:text-smidhus-bone-dim/20"
                aria-label="Zoom in diagram"
              >
                +
              </button>
              <button
                type="button"
                onClick={resetZoom}
                className="h-7 border-l border-dashed border-[#1F242C] px-2 font-mono text-[10px] uppercase tracking-[0.12em] text-[#D38B5b] transition-colors hover:text-smidhus-bone"
                aria-label="Reset diagram zoom"
              >
                Fit
              </button>
            </div>
          </div>

          <div
            ref={panContainerRef}
            onClick={(event) => event.stopPropagation()}
            onPointerDown={startPanning}
            onPointerMove={movePanning}
            onPointerUp={stopPanning}
            onPointerCancel={stopPanning}
            onPointerLeave={stopPanning}
            className={`flex-1 animate-[diagramScaleIn_160ms_ease-out] select-none overflow-auto p-6 pb-24 md:p-10 md:pb-28 ${
              isPanning ? "cursor-grabbing" : "cursor-grab"
            }`}
          >
            <div
              className="mx-auto transition-[width] duration-150 ease-out [&>svg]:pointer-events-none [&>svg]:h-auto [&>svg]:w-full [&>svg]:max-w-none"
              style={modalDiagramWidth}
              dangerouslySetInnerHTML={{ __html: svg }}
            />
          </div>

          <div
            className="pointer-events-none fixed inset-x-0 bottom-0 z-[1000] flex justify-center border-t border-dashed border-[#1F242C] bg-[#07090C] px-4 py-3"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onPointerDown={(event) => {
                event.stopPropagation();
                closeExpandedView();
              }}
              onClick={(event) => {
                event.stopPropagation();
                closeExpandedView();
              }}
              className="pointer-events-auto border border-dashed border-[#D38B5b]/70 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[#D38B5b] transition-colors hover:bg-[#D38B5b]/10 hover:text-smidhus-bone"
              aria-label="Close expanded diagram and return to reading"
            >
              Back to reading
            </button>
          </div>
        </div>,
        document.body
      )}
    </figure>
  );
}
