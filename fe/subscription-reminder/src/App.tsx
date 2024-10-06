import { useForm } from "react-hook-form";
import "./App.css";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  Form,
} from "./components/ui/Form/form";
import { ModeToggle } from "./theme/mode-toggle";
import { Input } from "./components/ui/Input/input";
import Button from "./components/ui/Button/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";

function App() {
  const form = useForm();

  return (
    <>
      <ModeToggle />
      <Form {...form}>
        <Card className="m-4 p-4">
          <CardHeader>
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <>
                  <CardContent className="text-left">
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" {...field} />
                      </FormControl>
                    </FormItem>
                  </CardContent>
                </>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <>
                  <CardContent className="text-left">
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="za" {...field} />
                      </FormControl>
                    </FormItem>
                  </CardContent>
                </>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button
              variant="destructive"
              type="submit"
              onSubmit={() => {
                console.log("submit button clicked");
              }}
            >
              Submit
            </Button>
          </CardFooter>
        </Card>
      </Form>
    </>
  );
}

export default App;
