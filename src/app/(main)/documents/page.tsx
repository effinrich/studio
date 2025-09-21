import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { HardHat } from "lucide-react";

export default function DocumentsPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-headline text-3xl font-semibold">Documents</h1>
      <Card>
        <CardHeader>
          <CardTitle>Document Management</CardTitle>
          <CardDescription>Store and organize lease agreements, application forms, and other important documents.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center gap-4 text-center h-64 rounded-lg border-2 border-dashed">
            <HardHat className="h-12 w-12 text-muted-foreground" />
            <h2 className="text-xl font-semibold">Feature Coming Soon</h2>
            <p className="text-muted-foreground max-w-sm">
                We're currently building out this document management feature. Check back soon for updates!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
