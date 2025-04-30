import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";

const technologies = [
  { name: "PyTorch", className: "bg-blue-100 text-blue-800" },
  { name: "PyTorch Geometric", className: "bg-blue-100 text-blue-800" },
  { name: "Qiskit", className: "bg-purple-100 text-purple-800" },
  { name: "RDKit", className: "bg-green-100 text-green-800" },
  { name: "Flask/FastAPI", className: "bg-yellow-100 text-yellow-800" },
  { name: "React", className: "bg-indigo-100 text-indigo-800" },
  { name: "Tailwind CSS", className: "bg-pink-100 text-pink-800" },
];

const publications = [
  {
    title: "Quantum-Enhanced Graph Neural Networks for Drug Discovery",
    journal: "Journal of Chemical Information and Modeling",
    year: "2023",
    authors: "Johnson, A., Zhang, L., Patel, S., et al.",
  },
  {
    title: "Variational Quantum Circuits for Molecular Property Prediction",
    journal: "Nature Computational Science",
    year: "2022",
    authors: "Lee, J., Ramirez, M., Chen, T., et al.",
  },
  {
    title: "Hybrid Quantum-Classical Algorithms for Drug-Target Interaction Prediction",
    journal: "Quantum Machine Intelligence",
    year: "2021",
    authors: "Garcia, N., Wong, H., Schmidt, B., et al.",
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          About Our Technology
        </h2>
        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
          Combining cutting-edge AI with quantum computing for breakthrough drug discovery
        </p>
      </div>

      <Card className="mt-10">
        <CardHeader className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Technical Framework
          </h3>
        </CardHeader>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Graph Neural Networks
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                Our system uses PyTorch Geometric to implement specialized GNN architectures that effectively learn representations of molecular structures. These networks process atoms as nodes and bonds as edges, capturing complex structural patterns critical for drug function.
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Quantum Computing Integration
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                Built with Qiskit, our quantum layers leverage quantum principles to enhance molecular property predictions. The system uses variational quantum circuits that can process molecular features in a high-dimensional Hilbert space, accessing quantum advantages for certain computation types.
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Tech Stack
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech) => (
                    <Badge key={tech.name} className={tech.className}>
                      {tech.name}
                    </Badge>
                  ))}
                </div>
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Data Processing
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                Molecular data is processed using RDKit for cheminformatics operations, enabling conversion between file formats, SMILES strings, and molecular graphs. Our pipeline handles data augmentation, feature extraction, and normalization specific to drug discovery tasks.
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Model Training
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                Models are trained on curated datasets including ChEMBL, PubChem, and BindingDB with proprietary quantum-classical optimization techniques. Training employs distributed computing across GPU clusters with quantum simulation or quantum hardware access via IBM Quantum.
              </dd>
            </div>
          </dl>
        </div>
      </Card>

      <Card className="mt-10">
        <CardHeader className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Research Publications
          </h3>
        </CardHeader>
        <CardContent className="px-4 py-5 sm:p-6">
          <ul className="divide-y divide-gray-200">
            {publications.map((pub, index) => (
              <li key={index} className="py-4">
                <div className="flex space-x-3">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium">{pub.title}</h3>
                      <p className="text-sm text-gray-500">{pub.year}</p>
                    </div>
                    <p className="text-sm text-gray-500">{pub.journal}</p>
                    <p className="text-sm text-gray-500">Authors: {pub.authors}</p>
                  </div>
                  <FileText className="flex-shrink-0 h-5 w-5 text-primary" />
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className="mt-10">
        <div className="bg-primary rounded-lg shadow-xl overflow-hidden">
          <div className="px-6 py-10 sm:px-12 sm:py-16">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
                Ready to transform drug discovery?
              </h2>
              <p className="mt-3 text-xl text-blue-100 sm:mt-4">
                Get started with our quantum-enhanced AI platform today.
              </p>
              <div className="mt-8 flex justify-center">
                <Link href="/input">
                  <Button variant="secondary">
                    Try It Now
                  </Button>
                </Link>
                <Link href="#">
                  <Button variant="primary" className="ml-3 bg-blue-700 hover:bg-blue-800">
                    Request Demo
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
