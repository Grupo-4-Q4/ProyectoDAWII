import NavbarComponet from "@/Componets/NavBar/NavbarComponet";

export default function layoutComparador({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <div>
      <NavbarComponet></NavbarComponet>
      {children}
    </div>
  );
}