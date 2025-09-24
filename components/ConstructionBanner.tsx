export default function ConstructionBanner() {
  return (
    <div className="w-full bg-gray-200 text-black py-3 px-4 text-center font-medium">
      <p className="text-sm sm:text-base">
        This portfolio is under construction and has no public content, yet. Contact{' '}
        <a 
          href="mailto:thomaskelly281@gmail.com" 
          className="underline hover:text-gray-800 transition-colors"
        >
          thomaskelly281@gmail.com
        </a> for information.
      </p>
    </div> 
  );
}
