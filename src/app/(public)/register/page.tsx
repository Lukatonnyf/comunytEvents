import ThemeSwitcher from "@/providers/theme-switcher";


export default function Register() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-24 gap-10">
      <div>
        <h1>Hello World</h1>
        <p>Register</p>
      </div>
      <ThemeSwitcher />
    </div>
  );
}


