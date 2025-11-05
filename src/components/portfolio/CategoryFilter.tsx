import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronDown, Filter } from "lucide-react";
import clsx from "clsx";
import { ProjectCategory } from "../../types/portfolio";

export type CategoryOptionValue = ProjectCategory | "Todos";

const options: { value: CategoryOptionValue; label: string }[] = [
  { value: "Todos", label: "Todos los proyectos" },
  { value: "Estrategia", label: "Estrategia" },
  { value: "Diseño", label: "Diseño" },
  { value: "Website", label: "Website" },
  { value: "Varios", label: "Varios" }
];

interface CategoryFilterProps {
  value: CategoryOptionValue;
  onChange: (value: CategoryOptionValue) => void;
}

const CategoryFilter = ({ value, onChange }: CategoryFilterProps) => {
  return (
    <Listbox value={value} onChange={onChange}>
      {({ open }) => (
        <div className="relative w-full max-w-xs">
          <Listbox.Button
            className="flex w-full items-center justify-between rounded-full border border-primary-200 bg-white px-4 py-2 text-sm font-medium text-primary-700 shadow-md backdrop-blur transition hover:bg-primary-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          >
            <span className="inline-flex items-center gap-2">
              <Filter className="size-4" aria-hidden="true" />
              {options.find((option) => option.value === value)?.label}
            </span>
            <ChevronDown className={clsx("size-4 transition-transform", open && "rotate-180")} aria-hidden="true" />
          </Listbox.Button>
          <Transition
            as={Fragment}
            show={open}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Listbox.Options className="absolute z-20 mt-3 w-full space-y-1 rounded-2xl border border-primary-200 bg-white p-2 text-sm text-neutral-700 shadow-2xl ring-1 ring-black/5 backdrop-blur">
              {options.map((option) => (
                <Listbox.Option
                  key={option.value}
                  value={option.value}
                  className={({ active }) =>
                    clsx(
                      "flex cursor-pointer items-center rounded-xl px-3 py-2 transition",
                      active ? "bg-primary-500 text-white" : "hover:bg-primary-50"
                    )
                  }
                >
                  {option.label}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  );
};

export default CategoryFilter;
