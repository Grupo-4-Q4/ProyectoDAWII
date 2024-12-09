import NavbarComponet from "@/Componets/NavBar/NavbarComponet";
import ProveedorContexto from "@/Context/ProveedorContexto";

export default function layoutComparador({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <div>
      <ProveedorContexto>
      <NavbarComponet></NavbarComponet>
      {children}
      </ProveedorContexto>
     
    </div>
  );
}