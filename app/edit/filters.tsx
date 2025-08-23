import { useFiltersStore } from "@/providers/filters-store-provider";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
// import { Switch } from "@/components/ui/switch";
import { PhotostripStickers } from "./photostrip-stickers";

const colors = [
  "#000",
  "#F6F0F0",
  "#F2E2B1",
  "#C7D9DD",
  "#EEF1DA",
  "#EDE8DC",
  "#FDB7EA",
];

const filters = [
  "black-and-white",
  "sepia",
  "warm",
  "cold",
  "cool",
  "no-filter",
];

export const Filters = () => {
  const {
    photostrip,
    setPhotostrip,
    background,
    setBackground,
    filter,
    setFilter,
    // dateEnabled,
    // setDateEnabled,
  } = useFiltersStore((store) => store);
  return (
    <div className="order-1 w-full max-w-[350px] divide-y-2 self-center">
      <div className="pb-5">
        <p>Stickers</p>
        <PhotostripStickers />
      </div>
      <div className="pb-5">
        <p>Photostrip</p>
        <div className="flex flex-wrap gap-3">
          {colors.map((color) => (
            <button
              key={color}
              className={`flex aspect-square w-8 items-center justify-center rounded-full border md:w-12 ${
                photostrip === color ? "border-2 border-[#72b86d]" : ""
              }`}
              style={{ backgroundColor: color }}
              onClick={() => setPhotostrip(color)}
            >
              {photostrip === color && (
                <Check className="h-5 w-5 text-[#72b86d]" />
              )}
            </button>
          ))}
        </div>
      </div>
      <div className="py-5">
        <p>Background</p>
        <div className="flex flex-wrap gap-3">
          {colors.map((color) => (
            <button
              key={color}
              className={`flex aspect-square w-8 items-center justify-center rounded-full border md:w-12 ${
                background === color ? "border-2 border-[#72b86d]" : ""
              }`}
              style={{ backgroundColor: color }}
              onClick={() => setBackground(color)}
            >
              {background === color && (
                <Check className="h-5 w-5 text-[#72b86d]" />
              )}
            </button>
          ))}
        </div>
      </div>
      <div className="py-5">
        <p>Filters</p>
        <div className="flex flex-wrap gap-3">
          {filters.map((filt) => (
            <button
              key={filt}
              onClick={() => setFilter(filt)}
              className={cn(
                "rounded-full bg-black px-2 text-lg text-white",
                filter === filt && "bg-white text-black",
              )}
            >
              {filt}
            </button>
          ))}
        </div>
      </div>
      {/* <div className="pt-5">
        <div className="flex items-center space-x-3">
          <Switch
            id="display-toggle"
            checked={dateEnabled}
            onCheckedChange={setDateEnabled}
            className="data-[state=checked]:bg-[#B89B6D]"
          />
          <label
            htmlFor="display-toggle"
            className="cursor-pointer font-serif text-[#B89B6D]"
          >
            Enable Date
          </label>
        </div>
      </div> */}
    </div>
  );
};
