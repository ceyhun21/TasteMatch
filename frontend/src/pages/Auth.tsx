import React from 'react';

const Auth: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="card max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-center">Anmelden / Registrieren</h2>
        
        <form className="space-y-4">
          <input
            type="email"
            placeholder="E-Mail"
            className="input"
          />
          <input
            type="password"
            placeholder="Passwort"
            className="input"
          />
          <button type="submit" className="w-full btn-primary">
            Anmelden
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-slate-600">oder</p>
        </div>

        <button className="w-full btn-outline mt-4">
          Mit Google anmelden
        </button>
      </div>
    </div>
  );
};

export default Auth;
