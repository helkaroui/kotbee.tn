import StepperForm from "./ad-stepper";

export default function Page() {

  return (
    <div className="flex flex-col gap-y-4 mt-8 mb-4 min-w-[400px] lg:w-[700px] mx-auto justify-start items-start">
      <div className="w-full flex flex-col gap-x-2">
        <StepperForm />
      </div>
    </div>
  );
}
