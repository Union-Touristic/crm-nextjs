import { ReactNode } from "react";

type TimelineProps = {
  children: ReactNode;
};

export function Timeline({ children }: TimelineProps) {
  return (
    <ol className="relative border-l border-blue-800 dark:border-gray-700">
      {children}
    </ol>
  );
}

type StepProps = {
  index: number;
  children: React.ReactNode;
};

export function TimelineStep({ index, children }: StepProps) {
  return (
    <li className="mb-10 ml-4 lg:ml-16">
      <div className="absolute w-3 h-3 bg-blue-800 rounded-full -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
      <div className="text-blue-800 tracking-wider">Шаг {index}</div>
      {children}
    </li>
  );
}

export function TimelineStepTitle({ children }: { children: ReactNode }) {
  return (
    <h3 className="text-lg lg:text-2xl tracking-tight text-gray-900 dark:text-white mt-2">
      {children}
    </h3>
  );
}

export function TimelineStepDescription({ children }: { children: ReactNode }) {
  return (
    <p className="sm:text-lg leading-6 tracking-tight font-normal text-gray-500 dark:text-gray-500 md:max-w-2xl mt-2">
      {children}
    </p>
  );
}
