import Portal from "@/classes/Portal";

export default function PortalName({ portal }: Readonly<{ portal: Portal }>) {
    return <span className={portal.isNether ? "text-red-900" : "text-green-700"}>{portal.name}</span>;
}