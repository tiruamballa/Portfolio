package com.tiru.portfolio.aspect;

import com.tiru.portfolio.models.AdminActivityLog;
import com.tiru.portfolio.repositories.AdminActivityLogRepository;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.lang.reflect.Method;

@Aspect
@Component
public class ActivityLoggingAspect {

    private final AdminActivityLogRepository logRepository;

    public ActivityLoggingAspect(AdminActivityLogRepository logRepository) {
        this.logRepository = logRepository;
    }

    @AfterReturning(pointcut = "@annotation(com.tiru.portfolio.aspect.LogActivity)")
    public void logActivity(JoinPoint joinPoint) {
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        Method method = signature.getMethod();
        LogActivity logActivity = method.getAnnotation(LogActivity.class);

        String username = SecurityContextHolder.getContext().getAuthentication() != null
                ? SecurityContextHolder.getContext().getAuthentication().getName()
                : "SYSTEM";

        String action = logActivity.value();
        String details = "Admin [" + username + "] executed: " + action;
        
        logRepository.save(new AdminActivityLog(action, details));
    }
}
