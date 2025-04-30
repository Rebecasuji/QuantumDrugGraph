import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { analysisParametersSchema } from "@shared/schema";

const formSchema = analysisParametersSchema;

interface AnalysisParametersProps {
  onParametersChange: (values: z.infer<typeof formSchema>) => void;
}

export default function AnalysisParameters({ onParametersChange }: AnalysisParametersProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      model_type: "GNN",
      prediction_type: "Binding Affinity",
      quantum_depth: "Medium (3-5 layers)",
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onParametersChange(values);
  };

  return (
    <div className="mt-6 border-t border-gray-200 pt-6">
      <h3 className="text-lg font-medium leading-6 text-gray-900">Analysis Parameters</h3>
      
      <Form {...form}>
        <form onChange={form.handleSubmit(handleSubmit)} className="mt-4 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <FormField
            control={form.control}
            name="model_type"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel>Model Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select model type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="GNN">Graph Neural Network (GNN)</SelectItem>
                    <SelectItem value="Quantum GNN">Quantum GNN</SelectItem>
                    <SelectItem value="Hybrid Classical-Quantum">Hybrid Classical-Quantum</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="prediction_type"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel>Prediction Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select prediction type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Binding Affinity">Binding Affinity</SelectItem>
                    <SelectItem value="Toxicity">Toxicity</SelectItem>
                    <SelectItem value="Solubility">Solubility</SelectItem>
                    <SelectItem value="Blood-Brain Barrier Permeability">Blood-Brain Barrier Permeability</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="quantum_depth"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel>Quantum Circuit Depth</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select quantum depth" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Low (1-2 layers)">Low (1-2 layers)</SelectItem>
                    <SelectItem value="Medium (3-5 layers)">Medium (3-5 layers)</SelectItem>
                    <SelectItem value="High (6+ layers)">High (6+ layers)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
