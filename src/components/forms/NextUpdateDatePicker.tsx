"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

function formatDate(date: Date | undefined) {
  if (!date) {
    return "";
  }

  return date.toLocaleDateString("ja-JP", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

type Props = {
  errors?: string[];
  defaultDate?: Date;
};

export default function NextUpdateDatePicker({ errors, defaultDate }: Props) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(defaultDate);
  const [value, setValue] = React.useState(formatDate(defaultDate));
  const [month, setMonth] = React.useState<Date | undefined>(defaultDate || date);

  function formatDateForForm(date: Date | undefined) {
    if (!date) return "";

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  return (
    <div className="grid gap-2 mt-5">
      <Label htmlFor="date" className="px-1">
        次回更新日
      </Label>
      <div className="relative flex gap-2">
        <Input
          id="date"
          value={value}
          placeholder="日付を選択"
          className="bg-background pr-10 cursor-pointer"
          readOnly
          onClick={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setOpen(true);
            }
          }}
        />
        <input type="hidden" name="next_update" value={formatDateForForm(date)} />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              id="date-picker"
              variant="ghost"
              className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
            >
              <CalendarIcon className="size-3.5" />
              <span className="sr-only">Select date</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="end">
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              month={month}
              onMonthChange={setMonth}
              onSelect={(date) => {
                setDate(date);
                setValue(formatDate(date));
                setOpen(false);
              }}
              startMonth={new Date(2020, 0)}
              endMonth={new Date(2030, 11)}
            />
          </PopoverContent>
        </Popover>
      </div>
      {errors && <p className="text-red-500 text-sm">{errors[0]}</p>}
    </div>
  );
}
