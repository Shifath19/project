export interface SearchResponse {
  response: {
    numFound: number;
    start: number;
    docs: DiseaseDoc[];
  };
}

export interface DiseaseDoc {
  id: string;
  iri: string;
  short_form: string;
  label: string;
  description: string[];
  ontology_name: string;
  ontology_prefix: string;
  type: string[];
}