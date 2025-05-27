"use client"
import { useTheme } from "next-themes";
import { Moon } from "lucide-react";
import { Button } from "./ui/button";


const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      <Moon />
    </Button>
  )
}

export default ThemeSwitcher;
