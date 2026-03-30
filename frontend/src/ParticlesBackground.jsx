import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useCallback } from "react";

export default function ParticlesBackground() {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: {
          enable: true,
          zIndex: -1, // ✅ Keep particles behind everything
        },
        background: {
          color: "#0f172a"
        },
        fpsLimit: 60,
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "repulse"
            },
            resize: true
          },
          modes: {
            repulse: {
              distance: 100,
              duration: 0.4
            }
          }
        },
        particles: {
          number: {
            value: 60,
            density: {
              enable: true,
              area: 800
            }
          },
          color: {
            value: "#ffffff"
          },
          shape: {
            type: "circle"
          },
          opacity: {
            value: 0.5
          },
          size: {
            value: 3
          },
          move: {
            enable: true,
            speed: 1
          },
          links: {
            enable: true,
            color: "#ffffff",
            distance: 150,
            opacity: 0.4,
            width: 1
          }
        }
      }}
    />
  );
}
