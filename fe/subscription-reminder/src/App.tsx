import "./App.css";
import Button from "./components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "./components/ui/input";
import { ModeToggle } from "./theme/mode-toggle";

function App() {
  return (
    <>
      <ModeToggle />
      <Card className="mx-auto max-w-sm">
        <CardHeader className="space-y-1 dark:bg-slate-900">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>
            Enter your email and password to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
            <Button className="w-full">Login</Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default App;
