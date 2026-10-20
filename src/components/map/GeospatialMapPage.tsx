/**
 * @file GeospatialMapPage.tsx
 * @description Modul 4: Peta Interaktif Use Case Nasional dengan visualisasi peta Indonesia interaktif
 * realistis dan akurat sesuai referensi image_0bd98037.png dan image_6ca39afb.png.
 */

import React, { useState, useMemo, useRef, useCallback } from 'react';
import {
  RotateCcw,
  Plus,
  Minus,
  X,
  ExternalLink,
  Filter,
  Sparkles,
  MapPin,
  CheckCircle,
} from 'lucide-react';
import type { UseCaseItem } from '../../types/index.ts';
import {
  SECTOR_OPTIONS,
  TECHNOLOGY_OPTIONS,
  REGION_OPTIONS,
} from '../../constants/options.ts';
import { StatusBadge } from '../common/Badge.tsx';
import {
  INDONESIA_PROVINCES,
  OUTSIDER_PATHS,
  IndonesiaProvinceData,
} from './indonesiaMapData.ts';

interface GeospatialMapPageProps {
  useCases: UseCaseItem[];
  onSelectUseCase: (item: UseCaseItem) => void;
}

export const GeospatialMapPage: React.FC<GeospatialMapPageProps> = ({
  useCases,
  onSelectUseCase,
}) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('Jawa Barat');
  const [thematicTech, setThematicTech] = useState<string>('Semua Teknologi');
  const [selectedSector, setSelectedSector] = useState<string>('Semua Sektor');

  // Zoom and Pan states
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [hoveredProvince, setHoveredProvince] = useState<string | null>(null);

  // Dynamic Anchor coordinates for the floating card (in percentage of container 0..100)
  const [clickAnchor, setClickAnchor] = useState<{ x: number; y: number } | null>({
    x: 27.2,
    y: 79.1,
  });

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Zoom handlers
  const handleZoomIn = () => setZoomLevel((z) => Math.min(3.0, Number((z + 0.3).toFixed(2))));
  const handleZoomOut = () => setZoomLevel((z) => Math.max(0.7, Number((z - 0.3).toFixed(2))));
  const handleReset = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  // Drag pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel <= 1) return;
    isDraggingRef.current = true;
    dragStartRef.current = { x: e.clientX - panOffset.x, y: e.clientY - panOffset.y };
  };

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDraggingRef.current || zoomLevel <= 1) return;
      setPanOffset({
        x: e.clientX - dragStartRef.current.x,
        y: e.clientY - dragStartRef.current.y,
      });
    },
    [zoomLevel]
  );

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  // Find active selected province data
  const activeProvinceData = useMemo(() => {
    return (
      INDONESIA_PROVINCES.find((p) => p.name === selectedRegion) ||
      INDONESIA_PROVINCES[2] // default Jawa Barat
    );
  }, [selectedRegion]);

  // Use cases filtered by region, sector, technology
  const regionUseCases = useMemo(() => {
    return useCases.filter((item) => {
      const matchRegion =
        selectedRegion === 'Semua Wilayah' || item.wilayah.includes(selectedRegion);
      const matchTech =
        thematicTech === 'Semua Teknologi' ||
        item.teknologi.some((t) => t.toLowerCase().includes(thematicTech.toLowerCase()));
      const matchSector =
        selectedSector === 'Semua Sektor' || item.sektor === selectedSector;
      return matchRegion && matchTech && matchSector;
    });
  }, [useCases, selectedRegion, thematicTech, selectedSector]);

  // Handler click on province
  const handleProvinceClick = (
    prov: IndonesiaProvinceData,
    e?: React.MouseEvent<SVGElement>
  ) => {
    setSelectedRegion(prov.name);

    if (e && mapContainerRef.current) {
      const rect = mapContainerRef.current.getBoundingClientRect();
      const pctX = ((e.clientX - rect.left) / rect.width) * 100;
      const pctY = ((e.clientY - rect.top) / rect.height) * 100;
      setClickAnchor({ x: Math.max(4, Math.min(96, pctX)), y: Math.max(4, Math.min(96, pctY)) });
    } else {
      const pctX = (prov.center.x / 2021) * 100;
      const pctY = (prov.center.y / 922) * 100;
      setClickAnchor({ x: Math.max(4, Math.min(96, pctX)), y: Math.max(4, Math.min(96, pctY)) });
    }
  };

  // When selectedRegion changes from the dropdown
  const handleRegionDropdownChange = (name: string) => {
    setSelectedRegion(name);
    const found = INDONESIA_PROVINCES.find((p) => p.name === name);
    if (found) {
      const pctX = (found.center.x / 2021) * 100;
      const pctY = (found.center.y / 922) * 100;
      setClickAnchor({ x: Math.max(4, Math.min(96, pctX)), y: Math.max(4, Math.min(96, pctY)) });
    } else {
      setClickAnchor(null);
    }
  };

  // Card dynamic positioning calculation
  const cardStyle = useMemo(() => {
    const anchorX = clickAnchor?.x ?? (activeProvinceData ? (activeProvinceData.center.x / 2021) * 100 : 30);
    const anchorY = clickAnchor?.y ?? (activeProvinceData ? (activeProvinceData.center.y / 922) * 100 : 70);

    const isRightSide = anchorX > 52;
    const isBottomSide = anchorY > 52;

    const style: React.CSSProperties = {
      maxWidth: '380px',
      position: 'absolute',
      zIndex: 35,
    };

    if (isRightSide) {
      style.right = `calc(${Math.max(2, Math.min(65, 100 - anchorX + 2))}%)`;
      style.left = 'auto';
    } else {
      style.left = `calc(${Math.max(2, Math.min(65, anchorX + 2))}%)`;
      style.right = 'auto';
    }

    if (isBottomSide) {
      style.bottom = `calc(${Math.max(3, Math.min(65, 100 - anchorY + 3))}%)`;
      style.top = 'auto';
    } else {
      style.top = `calc(${Math.max(3, Math.min(65, anchorY + 3))}%)`;
      style.bottom = 'auto';
    }

    return style;
  }, [clickAnchor, activeProvinceData]);

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          Peta Interaktif Use Case Nasional
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Visualisasi geospasial sebaran dan adopsi implementasi kecerdasan artifisial di seluruh Indonesia.
        </p>
      </div>

      {/* Filter Tematik */}
      <div className="flex flex-wrap items-center gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center space-x-1.5 text-xs text-slate-500 font-semibold pl-1">
          <Filter className="w-4 h-4 text-slate-400" />
          <span>Filter Tematik:</span>
        </div>

        <select
          value={thematicTech}
          onChange={(e) => setThematicTech(e.target.value)}
          className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-none focus:border-blue-500 cursor-pointer"
        >
          {TECHNOLOGY_OPTIONS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        <select
          value={selectedSector}
          onChange={(e) => setSelectedSector(e.target.value)}
          className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-none focus:border-blue-500 cursor-pointer"
        >
          {SECTOR_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <select
          value={selectedRegion}
          onChange={(e) => handleRegionDropdownChange(e.target.value)}
          className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-none focus:border-blue-500 cursor-pointer font-medium"
        >
          {REGION_OPTIONS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>

        {selectedRegion !== 'Semua Wilayah' && (
          <button
            type="button"
            onClick={() => {
              setSelectedRegion('Semua Wilayah');
              setClickAnchor(null);
            }}
            className="text-xs text-blue-600 hover:underline font-medium cursor-pointer"
          >
            Reset Wilayah
          </button>
        )}
      </div>

      {/* ================= INTERACTIVE REALISTIC INDONESIA VECTOR MAP ================= */}
      {/* Sesuai referensi foto asli image_0bd98037.png dan image_6ca39afb.png */}
      <div
        ref={mapContainerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        className="relative w-full rounded-2xl border border-slate-200 bg-[#F4F6F9] shadow-xs overflow-hidden min-h-[500px] select-none"
        style={{ cursor: zoomLevel > 1 ? (isDraggingRef.current ? 'grabbing' : 'grab') : 'default' }}
      >
        {/* Delicate technical grid background matching reference image_0bd98037 */}
        <div
          className="absolute inset-0 pointer-events-none opacity-45"
          style={{
            backgroundImage:
              'linear-gradient(to right, #CBD5E1 1px, transparent 1px), linear-gradient(to bottom, #CBD5E1 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Floating Top-Left Map Controls (+, -, Undo/Reset) matching reference image */}
        <div className="absolute top-5 left-5 z-20 flex flex-col space-y-2">
          {/* Undo / Reset View */}
          <button
            type="button"
            onClick={handleReset}
            title="Reset Posisi & Tampilan"
            className="w-9 h-9 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-sm flex items-center justify-center text-slate-700 hover:text-blue-600 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Zoom Group */}
          <div className="bg-white border border-slate-300 rounded-lg shadow-sm overflow-hidden flex flex-col divide-y divide-slate-200">
            <button
              type="button"
              onClick={handleZoomIn}
              title="Perbesar Peta (+)"
              className="w-9 h-9 hover:bg-slate-50 flex items-center justify-center text-slate-700 hover:text-blue-600 transition-colors cursor-pointer font-bold"
            >
              <Plus className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleZoomOut}
              title="Perkecil Peta (-)"
              className="w-9 h-9 hover:bg-slate-50 flex items-center justify-center text-slate-700 hover:text-blue-600 transition-colors cursor-pointer font-bold"
            >
              <Minus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Hover quick badge */}
        {hoveredProvince && hoveredProvince !== selectedRegion && (
          <div className="absolute top-5 right-5 z-20 pointer-events-none bg-slate-900/80 backdrop-blur-xs text-white text-xs px-3 py-1.5 rounded-lg shadow-md animate-in fade-in flex items-center space-x-1.5">
            <MapPin className="w-3.5 h-3.5 text-rose-400" />
            <span className="font-semibold">{hoveredProvince}</span>
          </div>
        )}

        {/* Interactive SVG Surface */}
        <div className="w-full h-[520px] flex items-center justify-center overflow-hidden p-3 md:p-6">
          <svg
            viewBox="0 0 2021 922"
            className="w-full h-full max-h-[500px] transition-transform duration-300 ease-out"
            style={{
              transform: `scale(${zoomLevel}) translate(${panOffset.x / zoomLevel}px, ${panOffset.y / zoomLevel}px)`,
              transformOrigin: 'center center',
            }}
          >
            {/* 1. Neighboring territory contexts (Outsiders) */}
            <g id="Outsiders" opacity="0.45">
              {OUTSIDER_PATHS.map((item, idx) => (
                <g key={idx} transform={`matrix(1,0,0,1,${item.tx},${item.ty})`}>
                  <path
                    d={item.d}
                    fill="#BACBD8"
                    stroke="#FFFFFF"
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                  />
                </g>
              ))}
            </g>

            {/* 2. Master Indonesia Map: High-fidelity realistic geography */}
            <g id="Indonesia-Map" transform="matrix(1,0,0,1,-18.4771,18.4557)">
              {INDONESIA_PROVINCES.map((prov) => {
                const isSelected = selectedRegion === prov.name;
                const isHovered = hoveredProvince === prov.name;

                // Color palette matching image_0bd98037 & image_6ca39afb:
                // Normal: #829DB2 (slate steel-blue)
                // Hover: #5B849F (interactive highlight)
                // Selected: #3A6585 (active ocean navy)
                let fillColor = '#829DB2';
                if (isSelected) {
                  fillColor = '#3A6585';
                } else if (isHovered) {
                  fillColor = '#5B849F';
                }

                return (
                  <g
                    key={prov.id}
                    id={prov.id}
                    className="cursor-pointer transition-colors duration-150"
                    onMouseEnter={() => setHoveredProvince(prov.name)}
                    onMouseLeave={() => setHoveredProvince(null)}
                    onClick={(e) => handleProvinceClick(prov, e)}
                  >
                    {prov.subgroups.map((sub, sIdx) => (
                      <g
                        key={sIdx}
                        transform={
                          sub.tx !== 0 || sub.ty !== 0
                            ? `matrix(1,0,0,1,${sub.tx},${sub.ty})`
                            : undefined
                        }
                      >
                        {sub.paths.map((pathD, pIdx) => (
                          <path
                            key={pIdx}
                            d={pathD}
                            fill={fillColor}
                            stroke="#FFFFFF"
                            strokeWidth="1.5"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                          >
                            <title>{prov.name}</title>
                          </path>
                        ))}
                      </g>
                    ))}
                  </g>
                );
              })}

              {/* 3. Hot-pink / Magenta Highlight Marker Box (matching image_0bd98037 and image_6ca39afb) */}
              {activeProvinceData && selectedRegion !== 'Semua Wilayah' && (
                <g
                  className="cursor-pointer transition-all duration-300"
                  onClick={(e) => handleProvinceClick(activeProvinceData, e)}
                >
                  {/* Glowing subtle ring */}
                  <rect
                    x={activeProvinceData.center.x - 22}
                    y={activeProvinceData.center.y - 22}
                    width="44"
                    height="44"
                    rx="6"
                    fill="#E11D48"
                    opacity="0.25"
                    className="animate-ping"
                  />
                  {/* Distinct Magenta Box with white outline */}
                  <rect
                    x={activeProvinceData.center.x - 17}
                    y={activeProvinceData.center.y - 17}
                    width="34"
                    height="34"
                    rx="4"
                    fill="#E11D48"
                    stroke="#FFFFFF"
                    strokeWidth="2.5"
                    className="shadow-lg"
                  />
                  {/* Central crisp white locator dot */}
                  <circle
                    cx={activeProvinceData.center.x}
                    cy={activeProvinceData.center.y}
                    r="4.5"
                    fill="#FFFFFF"
                  />
                </g>
              )}
            </g>
          </svg>
        </div>

        {/* ================= FLOATING INTERACTIVE INFORMATION CARD POPUP ================= */}
        {/* Dynamic coordinate anchoring: Follows the clicked/hovered position smoothly! */}
        {/* Sesuai referensi image_6ca39afb.png */}
        {activeProvinceData && selectedRegion !== 'Semua Wilayah' && (
          <div
            style={cardStyle}
            className="transition-all duration-300 ease-out animate-in fade-in zoom-in-95 pointer-events-auto"
          >
            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-200/90 p-5 space-y-3.5 relative text-slate-800 ring-1 ring-slate-900/5">
              {/* Close Button */}
              <button
                type="button"
                onClick={() => {
                  setSelectedRegion('Semua Wilayah');
                  setClickAnchor(null);
                }}
                className="absolute top-3.5 right-3.5 text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                title="Tutup Popup Informasi"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header Info */}
              <div className="flex items-center space-x-3 pr-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-pink-500 text-white shadow-sm flex items-center justify-center font-bold text-xs shrink-0 tracking-wider">
                  AI
                </div>
                <div className="overflow-hidden">
                  <h3 className="font-bold text-sm text-slate-900 leading-snug truncate">
                    {activeProvinceData.name}
                  </h3>
                  <div className="flex items-center space-x-1.5 mt-0.5">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      Pulau {activeProvinceData.island} • {activeProvinceData.count} Inisiatif Terdaftar
                    </span>
                  </div>
                </div>
              </div>

              {/* Key Indicators */}
              <div className="space-y-2 text-xs border-t border-slate-100 pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Sektor Unggulan:</span>
                  <span className="font-semibold text-slate-800 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                    {activeProvinceData.sector}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Teknologi Kunci:</span>
                  <span className="font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded text-[11px] border border-blue-100">
                    {activeProvinceData.tech}
                  </span>
                </div>

                {/* Inisiatif Nyata dari Database */}
                {regionUseCases.length > 0 && (
                  <div className="p-3 bg-slate-50/90 rounded-xl border border-slate-100 mt-2 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                        Inisiatif Utama:
                      </span>
                      <StatusBadge status={regionUseCases[0].status} />
                    </div>
                    <p className="font-semibold text-slate-900 text-xs line-clamp-1">
                      {regionUseCases[0].judul}
                    </p>
                    <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                      {regionUseCases[0].deskripsiSingkat}
                    </p>
                  </div>
                )}
              </div>

              {/* Action Button: Jump to detailed use case view */}
              {regionUseCases.length > 0 && (
                <button
                  type="button"
                  onClick={() => onSelectUseCase(regionUseCases[0])}
                  className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors flex items-center justify-center space-x-1.5 cursor-pointer mt-1"
                >
                  <span>Buka Detail Use Case Ini</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* List of Use Cases in Selected Region */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">
            Daftar Use Case di Wilayah:{' '}
            <span className="text-blue-600 font-bold">{selectedRegion}</span> ({regionUseCases.length})
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {regionUseCases.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectUseCase(item)}
              className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-slate-50/50 transition-all cursor-pointer space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                  {item.sektor}
                </span>
                <StatusBadge status={item.status} />
              </div>
              <h4 className="font-bold text-xs text-slate-900 line-clamp-1">
                {item.judul}
              </h4>
              <p className="text-[11px] text-slate-500 line-clamp-2">
                {item.deskripsiSingkat}
              </p>
              <div className="text-[10px] text-slate-400 pt-1 flex items-center justify-between">
                <span>{item.fase1.instansi}</span>
                <span className="font-medium text-slate-600">{item.wilayah}</span>
              </div>
            </div>
          ))}

          {regionUseCases.length === 0 && (
            <div className="col-span-2 py-8 text-center text-slate-400 text-xs">
              Tidak ada use case yang terdaftar khusus pada kombinasi filter wilayah dan teknologi ini.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
