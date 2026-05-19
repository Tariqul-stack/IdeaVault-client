import RegisterForm from "../../components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <section className="relative grid min-h-[calc(100vh-6.5rem)] place-items-center overflow-hidden px-4 py-10 sm:px-6 md:px-8 md:py-14 lg:px-8">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,11,18,0.06),rgba(11,11,18,0))] dark:bg-[linear-gradient(180deg,rgba(6,7,14,0.78),rgba(6,7,14,0.92))]" />
      <div className="absolute left-[8%] top-[12%] h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(45,212,191,0.12),transparent_68%)] blur-3xl dark:bg-[radial-gradient(circle,rgba(45,212,191,0.18),transparent_68%)]" />
      <div className="absolute bottom-[10%] right-[7%] h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(110,86,255,0.1),transparent_70%)] blur-3xl dark:bg-[radial-gradient(circle,rgba(110,86,255,0.18),transparent_70%)]" />

      <div className="relative flex w-full justify-center">
        <RegisterForm />
      </div>
    </section>
  );
}
